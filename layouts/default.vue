<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      mini: true,
      isDark: false,

      menuItems: [
        { title: 'Торговые точки', icon: 'mdi-store', to: '/store' },
        { title: 'Кофемашины', icon: 'mdi-coffee-maker', to: '/coffee' },
        {
          title: 'Сотрудники',
          icon: 'mdi-badge-account-horizontal',
          to: '/staff'
        },
        { title: 'Напитки', icon: 'mdi-cup-water', to: '/drinks' },
        { title: 'Абонементы', icon: 'mdi-ticket-percent', to: '/passes' },
        {
          title: 'Активные абонементы',
          icon: 'mdi-ticket-confirmation',
          to: '/active-passes'
        }
      ]
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.$vuetify.theme.dark = this.isDark
      // if (process.client) {
      //   localStorage.setItem('themeIsDark', this.isDark)
      // }
    }
  }
  // mounted() {
  //   if (process.client) {
  //     const storedTheme = localStorage.getItem('themeIsDark')
  //     if (storedTheme !== null) {
  //       this.isDark = JSON.parse(storedTheme)
  //       this.$vuetify.theme.dark = this.isDark
  //     }
  //   }
  // }
}
</script>

<template>
  <v-app :dark="isDark">
    <v-navigation-drawer v-model="drawer" app clipped :mini-variant="mini">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Михаил Макеев</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          :to="item.to"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item
          link
          to="/users"
          exact
          :class="isDark ? 'grey darken-3' : 'grey lighten-3'"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="surface" elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn icon class="d-none d-md-inline-flex" @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="toggleTheme">
            <v-icon>{{
              isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'
            }}</v-icon>
          </v-btn>
        </template>
        <span>{{ isDark ? 'Светлая тема' : 'Темная тема' }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.v-navigation-drawer__append {
  .v-list-item--active {
    background-color: var(--v-primary-base) !important;
    color: #000000;
    .v-icon {
      color: #000000;
    }
  }
}
</style>
