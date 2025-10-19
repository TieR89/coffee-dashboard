import faker from 'faker'
faker.locale = 'ru'

faker.seed(123)

const TOTAL_USERS = 8000
const NETWORK_OVERHEAD_MS = 500

// ----- Кэш данных -----
let usersCache = null
let citiesCache = null

// ----- Хелперы -----

/**
 * Имитирует сетевую задержку
 * @param {number} ms - Время задержки в миллисекундах
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Генерирует список уникальных городов
 * @returns {Array<{id: string, title: string}>}
 */
function generateCities() {
  if (citiesCache) {
    return citiesCache
  }
  const citySet = new Set()
  while (citySet.size < 30) {
    citySet.add(faker.address.city())
  }

  citiesCache = Array.from(citySet).map((cityTitle) => ({
    id: faker.datatype.uuid(),
    title: cityTitle
  }))

  return citiesCache
}

/**
 * Фабрика для создания одного пользователя
 * @returns {object} - Модель пользователя
 */
function createUserFactory() {
  const cities = getCities()
  const saveTotal = faker.datatype.number({ min: 100, max: 10000 })
  const spendTotal = faker.datatype.number({ min: 100, max: saveTotal }) // Потрачено не > накоплено
  const createdAt = faker.date.past(2).getTime() // За 2 последних года
  const updatedAt = faker.date.between(createdAt, new Date()).getTime()

  return {
    id: faker.datatype.uuid(),
    balance: saveTotal - spendTotal,
    cashbackPercent: faker.datatype.number({ min: 0, max: 20 }),
    city: faker.random.arrayElement(cities),
    isBlocked: faker.datatype.boolean(),
    lastSave: faker.date.between(createdAt, updatedAt).getTime(),
    lastSpend: faker.date.between(createdAt, updatedAt).getTime(),
    lastVisit: faker.date.recent(30).getTime(), // За последний месяц
    name: faker.name.firstName() + ' ' + faker.name.lastName(), // "Галина" -> Имя + Фамилия
    phone: `+79${faker.phone.phoneNumber('##***####')}`, // Формат +79*****2219
    role: 'customer',
    saveCount: faker.datatype.number({ min: 1, max: 200 }),
    saveTotal,
    spendCount: faker.datatype.number({ min: 1, max: 100 }),
    spendTotal,
    updatedAt,
    createdAt
  }
}

/**
 * Генерирует и кэширует 8000 пользователей
 * @returns {Array<object>}
 */
function generateUsers() {
  if (usersCache) {
    return usersCache
  }

  getCities()

  usersCache = Array.from({ length: TOTAL_USERS }, createUserFactory)
  return usersCache
}

// ----- Инициализация API -----

function getCities() {
  return generateCities()
}
function getUsers() {
  return generateUsers()
}

const api = {
  /**
   * API для пользователей
   */
  users: {
    /**
     * Получает список пользователей с имитацией задержки
     * @param {{offset: number, limit: number}} params
     * @returns {Promise<{users: Array<object>, total: number}>}
     */
    async list({ offset = 0, limit = 50 }) {
      await sleep(NETWORK_OVERHEAD_MS)
      const allUsers = getUsers()
      const paginatedUsers = allUsers.slice(offset, offset + limit)
      return {
        users: paginatedUsers,
        total: allUsers.length
      }
    }
  },

  /**
   * API для городов
   */
  cities: {
    /**
     * Получает список всех городов (синхронно, т.к. они уже в кэше)
     * @returns {Array<{id: string, title: string}>}
     */
    list() {
      return getCities()
    }
  }
}

// ----- Регистрация плагина -----

export default (context, inject) => {
  // Инжектируем 'api' в Nuxt-контекст ($api)
  inject('api', api)
}
