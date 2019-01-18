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
    </div>
    `,
  data() {
    return {
      direction: 'to right',
      directions: ['to top', 'to right', 'to bottom', 'to left'],
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: `linear-gradient(${this.direction}, hsl(0, 70%, 50%), hsl(100, 70%, 50%))`,
        padding: '30px',
        margin: '16px 0',
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
        <color-form></color-form>
      </v-container>
    </v-content>
  </v-app>
`,
})
