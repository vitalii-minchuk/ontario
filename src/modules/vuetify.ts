import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const isDark = useDark()
// TODO: remove labs component imports when Vuetify 3 is released
export const vuetify = createVuetify({
  components: {},
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: isDark.value ? 'dark' : 'light'
  }
})
