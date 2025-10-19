<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    /**
     * Форматирует число как валюту (для РФ)
     * @param {number} value
     * @returns {string}
     */
    formatCurrency(value) {
      return `${value.toLocaleString('ru-RU')} ₽`
    },

    /**
     * Форматирует timestamp в локальную дату
     * @param {number} timestamp
     * @returns {string}
     */
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },

    emitCityClick() {
      this.$emit('city-click', this.user.city)
    },
    emitOpenDetails() {
      this.$emit('open-details', this.user)
    }
  }
}
</script>

<template>
  <v-card class="user-card" outlined>
    <v-card-title class="pb-2">
      <div class="user-card__header">
        <span class="text-h6 font-weight-bold">{{ user.name }}</span>
        <span class="text-caption d-block">{{ user.phone }}</span>
      </div>
    </v-card-title>

    <v-card-text class="py-2">
      <v-chip small class="user-card__city-chip" @click="emitCityClick">
        <v-icon left small>mdi-map-marker</v-icon>
        {{ user.city.title }}
      </v-chip>
    </v-card-text>

    <v-divider />

    <v-card-text class="user-card__stats pt-4">
      <v-row dense>
        <v-col cols="4">
          <div class="text-caption">Баланс</div>
          <div class="text-subtitle-1 font-weight-medium">
            {{ formatCurrency(user.balance) }}
          </div>
        </v-col>
        <v-col cols="4">
          <div class="text-caption">Накоплено</div>
          <div class="text-subtitle-1 font-weight-medium">
            {{ formatCurrency(user.saveTotal) }}
          </div>
        </v-col>
        <v-col cols="4">
          <div class="text-caption">Потрачено</div>
          <div class="text-subtitle-1 font-weight-medium">
            {{ formatCurrency(user.spendTotal) }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="user-card__actions">
      <div class="text-caption px-2">
        Посещение: {{ formatDate(user.lastVisit) }}
      </div>
      <v-spacer />
      <v-btn color="primary" text small @click="emitOpenDetails">
        Детали
        <v-icon right small>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  .user-card__stats {
    flex-grow: 1;
  }

  .user-card__actions {
    flex-shrink: 0;
  }
}
</style>
