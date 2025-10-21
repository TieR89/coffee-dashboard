<template>
  <v-container fill-height>
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12" md="8">
        <v-card class="pa-8" outlined color="surface">
          <h1>Добро пожаловать</h1>

          <p class="body-1 mt-4" style="font-size: 16px;">
            Это стартовая страница проекта. <br />
            Весь основной функционал находится в разделе "Пользователи".
          </p>

          <v-btn color="primary" x-large to="/users" class="mt-6">
            Перейти к пользователям
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss" scoped>
.body-1 {
  color: var(--v-text-secondary-base);
}
</style>
