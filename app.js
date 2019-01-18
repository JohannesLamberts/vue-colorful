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
        <v-text-field
          v-if="!interval"
          :value="hues.join(', ')"
          @input="updateHues"
        />
        <p>{{style.backgroundImage}}</p>
        <v-btn @click="start">Start</v-btn>
        <v-btn @click="stop">Stop</v-btn>
    </div>
    `,
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      interval: null,
      hues: [0, 100],
      direction: 'to right',
      directions: ['to top', 'to right', 'to bottom', 'to left'],
    }
  },
  mounted() {
    this.load()
  },
  destroyed() {
    this.stop()
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
    updateHues(newVal) {
      const newHues = newVal.split(',').map(el => parseInt(el.trim(), 10))

      if (!/^(\d+, )+\d+$/.test(newVal) || newHues.some(el => el > 360)) {
        return
      }

      this.hues = newVal.split(',').map(el => parseInt(el.trim(), 10))
      this.save()
    },
    start() {
      this.stop()
      this.interval = setInterval(() => {
        this.hues = this.hues.map(hue => (hue + 1) % 360)
      }, 20)
      this.save()
    },
    stop() {
      clearInterval(this.interval)
      this.interval = null
      this.save()
    },
    save() {
      localStorage.setItem(`colors_${this.index}`, JSON.stringify({
        direction: this.direction,
        hues: this.hues,
        running: !!this.interval,
      }))
    },
    load() {
      const storageData = localStorage.getItem(`colors_${this.index}`)
      if (storageData) {
        const { hues, running, direction } = JSON.parse(storageData)
        this.hues = hues
        this.direction = direction
        if (running) {
          this.start()
        }
      }
    },
  },
})

new Vue({
  el: '#app',
  template: `
  <v-app>
    <v-content>
      <v-container>
        <color-form :index="0"></color-form>
        <color-form :index="1"></color-form>
        <color-form :index="2"></color-form>
      </v-container>
    </v-content>
  </v-app>
`,
})
