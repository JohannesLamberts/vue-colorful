Vue.component('color-form', {
  template: `
    <div
      :style="style"
      class="color-container"
    >
        <p>{{style.backgroundImage}}</p>
    </div>
    `,
  data() {
    return {
      style: {
        backgroundImage: `linear-gradient(to right, hsl(0, 70%, 50%), hsl(100, 70%, 50%))`,
        padding: '30px',
        margin: '16px 0',
      },
    }
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
