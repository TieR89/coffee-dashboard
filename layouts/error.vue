<template>
  <v-app dark>
    <v-container fill-height fluid>
      <v-row align="center" justify="center" class="text-center">
        <v-col cols="12" md="6">
          <div v-if="error.statusCode === 404">
            <v-img
              src="/images/404-animation.gif"
              alt="Page Not Found"
              contain
              max-height="400"
              class="mb-4"
            />
            <h1 class="text-h4 mb-2">Страница не найдена</h1>
            <p class="body-1">
              Похоже, вы зашли не туда. Давайте вернем вас на главную.
            </p>
          </div>

          <div v-else>
            <v-icon size="100" color="error" class="mb-4">
              mdi-alert-octagon-outline
            </v-icon>
            <h1 class="text-h4 mb-2">Произошла ошибка</h1>
            <p class="body-1">
              {{ error.message || 'Что-то пошло не так.' }}
            </p>
          </div>

          <v-btn color="primary" large to="/" class="mt-6">
            На главную
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? 'Страница не найдена' : 'Ошибка'
    return {
      title
    }
  }
}
</script>

<style scoped>
.v-application--wrap {
  min-height: 100vh;
}
</style>
