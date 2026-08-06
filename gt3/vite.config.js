import { createVuePlugin } from '@vitejs/plugin-vue2'

export default {
  plugins: [createVuePlugin()],
  server: {
    port: 3000
  }
}