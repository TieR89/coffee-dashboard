<script>
export default {
  name: 'UserDetailsModal',
  props: {
    // .sync
    visible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    close() {
      this.internalVisible = false
    },
    formatCurrency(value) {
      if (!value && value !== 0) return 'N/A'
      return `${value.toLocaleString('ru-RU')} ₽`
    }
  }
}
</script>

<template>
  <v-dialog v-model="internalVisible" max-width="600px" persistent>
    <v-card color="surface">
      <v-card-title>
        <span class="text-h5">{{ user ? user.name : 'Загрузка...' }}</span>
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text v-if="user">
        <v-list dense color="transparent">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{
                user.isBlocked ? 'mdi-cancel' : 'mdi-check-circle'
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.isBlocked ? 'Заблокирован' : 'Активен' }}
              </v-list-item-title>
              <v-list-item-subtitle>Статус</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-phone</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.phone }}</v-list-item-title>
              <v-list-item-subtitle>Телефон</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-map-marker</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.city.title }}</v-list-item-title>
              <v-list-item-subtitle>Город</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-wallet</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                formatCurrency(user.balance)
              }}</v-list-item-title>
              <v-list-item-subtitle>Баланс</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-identifier</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{
                user.id
              }}</v-list-item-title>
              <v-list-item-subtitle>ID пользователя</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" text @click="close">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
