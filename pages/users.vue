<script>
import SkeletonLoader from '~/components/SkeletonLoader.vue'
import UserItem from '~/components/UserItem.vue'
import UserDetailsModal from '~/components/UserDetailsModal.vue'

const TOTAL_USERS_TO_LOAD = 8000
const FIRST_LOAD_LIMIT = 100
const BATCH_LOAD_LIMIT = 500
const USERS_PER_PAGE = 50

export default {
  name: 'UsersPage',
  components: {
    SkeletonLoader,
    UserItem,
    UserDetailsModal
  },

  /**
   * Хук fetch() используется Nuxt для асинхронной загрузки данных
   * на стороне сервера (SSR) или клиента.
   */
  async fetch() {
    this.allCities = this.$api.cities.list()
    this.allUsers = []
    this.loadingProgress = 0

    try {
      // Запрос 1: Первые 100 пользователей
      const { users: firstUsers } = await this.$api.users.list({
        offset: 0,
        limit: FIRST_LOAD_LIMIT
      })
      this.allUsers.push(...firstUsers)
      this.loadingProgress = (this.allUsers.length / TOTAL_USERS_TO_LOAD) * 100

      // Запросы 2-N: Загружаем остальных пачками по 500
      for (
        let offset = FIRST_LOAD_LIMIT;
        offset < TOTAL_USERS_TO_LOAD;
        offset += BATCH_LOAD_LIMIT
      ) {
        const { users } = await this.$api.users.list({
          offset,
          limit: BATCH_LOAD_LIMIT
        })
        this.allUsers.push(...users)
        this.loadingProgress =
          (this.allUsers.length / TOTAL_USERS_TO_LOAD) * 100
      }
      this.loadingProgress = 100
    } catch (error) {
      this.$nuxt.error({
        statusCode: 500,
        message: 'Ошибка при загрузке пользователей'
      })
      throw new Error('Не удалось выполнить имитацию загрузки')
    }
  },

  data() {
    return {
      allUsers: [],
      allCities: [],
      loadingProgress: 0,

      searchQuery: '',
      selectedCities: [],

      pagination: {
        page: 1,
        perPage: USERS_PER_PAGE
      },

      selectedUser: null,
      isModalVisible: false
    }
  },

  computed: {
    /**
     * Фильтрует 8000 пользователей на основе поиска и городов
     * @returns {Array<object>}
     */
    filteredUsers() {
      let users = this.allUsers
      if (this.searchQuery) {
        const lowerQuery = this.searchQuery.toLowerCase()
        const searchPhone = this.searchQuery.replace(/\D/g, '')

        users = users.filter((user) => {
          const nameMatch = user.name.toLowerCase().includes(lowerQuery)
          const phoneMatch = user.phone.replace(/\D/g, '').includes(searchPhone)
          return nameMatch || phoneMatch
        })
      }

      if (this.selectedCities.length > 0) {
        users = users.filter((user) =>
          this.selectedCities.includes(user.city.id)
        )
      }

      return users
    },

    /**
     * Вычисляет общее количество страниц пагинации
     * @returns {number}
     */
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pagination.perPage)
    },

    /**
     * "Нарезает" отфильтрованный список для текущей страницы
     * @returns {Array<object>}
     */
    paginatedUsers() {
      const start = (this.pagination.page - 1) * this.pagination.perPage
      const end = start + this.pagination.perPage
      return this.filteredUsers.slice(start, end)
    }
  },

  watch: {
    // При любом изменении фильтров, сбрасываем пагинацию на 1-ю страницу
    searchQuery() {
      this.pagination.page = 1
    },
    selectedCities() {
      this.pagination.page = 1
    }
  },

  methods: {
    /**
     * Обрабатывает клик по городу - ставит галочку в фильтре
     * @param {object} city
     */
    handleCityClick(city) {
      if (!this.selectedCities.includes(city.id)) {
        this.selectedCities.push(city.id)
      }
    },

    /**
     * Открывает модальное окно с деталями пользователя
     * @param {object} user
     */
    openUserModal(user) {
      this.selectedUser = user
      this.isModalVisible = true
    }
  }
}
</script>

<template>
  <v-container fluid>
    <div v-if="$fetchState.pending">
      <v-progress-linear
        :value="loadingProgress"
        color="primary"
        height="10"
        striped
        stream
        class="mb-4"
      />
      <SkeletonLoader />
    </div>

    <div v-else-if="$fetchState.error">
      <v-alert type="error">
        Не удалось загрузить пользователей: {{ $fetchState.error.message }}
      </v-alert>
    </div>

    <div v-else>
      <h1>Пользователи</h1>

      <v-card class="my-4" color="surface" flat>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.trim="searchQuery"
                label="Поиск по имени или телефону"
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                hide-details
                clearable
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="selectedCities"
                :items="allCities"
                item-text="title"
                item-value="id"
                label="Фильтр по городам"
                multiple
                outlined
                dense
                hide-details
                chips
                deletable-chips
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col
          v-for="user in paginatedUsers"
          :key="user.id"
          cols="12"
          md="6"
          lg="4"
        >
          <UserItem
            :user="user"
            @open-details="openUserModal"
            @city-click="handleCityClick"
          />
        </v-col>
      </v-row>

      <v-row v-if="!paginatedUsers.length" justify="center">
        <v-col cols="12" class="text-center grey--text">
          <v-icon large class="mb-2">mdi-account-search-outline</v-icon>
          <p>Пользователи не найдены. Попробуйте изменить фильтры.</p>
        </v-col>
      </v-row>

      <v-pagination
        v-if="totalPages > 1"
        v-model="pagination.page"
        :length="totalPages"
        :total-visible="7"
        class="mt-6"
      />
    </div>

    <UserDetailsModal :visible.sync="isModalVisible" :user="selectedUser" />
  </v-container>
</template>

<style lang="scss" scoped>
.v-card.my-4 {
  margin-top: -8px !important;
  background-color: var(--v-secondary-base) !important;
  .theme--dark & {
    background-color: var(--v-surface-base) !important;
  }
}
</style>
