<template>
  <div
    class="w-full overflow-hidden"
  >
    <div class="w-full ">
      <controls v-model="selectedDay"></controls>
      <grid
        :selected-date="selectedDay"
        :schedule="schedule"
        :allow-add="allowAdd"
        :link-fields="linkFields"
        :allow-delete="allowDelete"
        :allow-update="allowUpdate"
        @delete-called="deleteItem"
        @update-called="editItem"
      >
      </grid>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import Controls from "./controls";
import Grid from "./grid";
import axios from "axios";
import { MessageBox } from "element-ui";

export default {
  props: {
    allowAdd: {
      type: Boolean,
      default: false
    },
    allowUpdate: {
      type: Boolean,
      default: false
    },
    allowDelete: {
      type: Boolean,
      default: false
    },
    schedule: {
        type: Array,
        default() {
            return []
        }
    },
    linkFields: {
        type: Object,
        default() {

        }
    },
    value: {
        type: Date,
        required: true
    }
  },
  components: {
    Controls,
    Grid
  },
  data() {
    return {
      formData: {},
      currentTime: new Date(),
      selectedDay: null,
      horaActiva: 0,
      modoManual: false,
      mostrarTodos: false,
    };
  },
  created() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  },
  watch: {
    selectedDay: {
      handler() {
        this.$emit("input", this.selectedDay);
      },
      immediate: true
    },
    value: {
      handler(newDate) {
          const selectedDay = newDate || new Date();
          if (!this.selectedDay || (format(selectedDay, "yyyy-MM-dd") != format(this.selectedDay, 'yyyy-MM-dd'))) {
              this.selectedDay = selectedDay;
          }
      },
      immediate: true
    }
  },
  computed: {
    horaActual() {
      return new Date().getHours();
    },
    currentProgram() {
      return this.schedule.find(program => {
        return this.isHourBetween(
          program.hora,
          program.hora_final,
          this.currentTime
        );
      });
    },
    nextProgram() {
      return {};
    }
  },
  methods: {
    isHourBetween(horaInicial = "", horaFinal = "", fechaActual) {
      const primerahoraString = horaInicial.replace(":", "");
      const segundahoraString = horaFinal.replace(":", "");
      const horaActualString = format(fechaActual, "HHmm");
      return (
        horaActualString >= primerahoraString &&
        horaActualString <= segundahoraString
      );
    },

    deleteItem(item) {
        this.$emit("delete", item)
    },

    editItem(item) {
        this.$emit("edit", item)
    }
  }
};
</script>

<style lang="scss">
:root {
  --primary-color: #030371;
  --primary-color-7: rgba(3, 3, 113, 0.7);
  --primary-color-6: rgba(3, 3, 113, 0.6);
  --primary-color-5: rgba(3, 3, 113, 0.5);
  --primary-radius: 14px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
