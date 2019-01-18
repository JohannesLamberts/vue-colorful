Vue.component('color-form', {
  template: `
    <div
      :style="style"
      class="color-container"
    >
        <v-select
          :items="directions"
          label="Direction"
          v-model="direction"
        />
        <p>{{style.backgroundImage}}</p>
        <v-btn @click="start">Start</v-btn>
    </div>
    `,
  data() {
    return {
      hues: [0, 100],
      direction: 'to right',
      directions: ['to top', 'to right', 'to bottom', 'to left'],
    }
  },
  computed: {
    colors() {
      return this.hues.map(hue => `hsl(${hue}, 70%, 50%)`)
    },
    style() {
      return {
        backgroundImage: `linear-gradient(${this.direction}, ${this.colors.join(', ')})`,
        padding: '30px',
        margin: '16px 0',
      }
    },
  },
  methods: {
    start() {
      setInterval(() => {
        this.hues = this.hues.map(hue => (hue + 1) % 360)
      }, 20)
    }
  }
})

new Vue({
  el: '#app',
  template: `
  <v-app>
    <v-content>
      <v-container>
        <color-form></color-form>
      </v-container>
    </v-content>
  </v-app>
`,
})
