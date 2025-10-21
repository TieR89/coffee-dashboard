export default {
  ssr: true,
  target: 'server',
  css: ['~/assets/scss/main.scss'],
  buildModules: ['@nuxtjs/vuetify'],
  plugins: ['~/plugins/api.js'],
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Nunito',
        weights: [400, 700]
      }
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FFD166',
          secondary: '#EEEEEE',
          accent: '#FFD166',
          background: '#FFFFFF',
          surface: '#FFFFFF'
        },
        dark: {
          primary: '#FFD166',
          secondary: '#333333',
          accent: '#FFD166',
          background: '#121212',
          surface: '#1E1E1E'
        }
      }
    }
  }
}
