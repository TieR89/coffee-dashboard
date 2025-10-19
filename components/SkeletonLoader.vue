<script>
export default {
  name: 'SkeletonLoader'
}
</script>

<template>
  <v-row>
    <v-col v-for="n in 6" :key="n" cols="12" md="6" lg="4">
      <v-card class="pa-2" outlined color="surface">
        <v-skeleton-loader
          type="list-item-avatar, article, actions"
        ></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>
