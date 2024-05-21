<script setup>
import PlanSelected from "@/components/plan/PlanSelected.vue";
import PlanSearch from "@/components/plan/PlanSearch.vue";
import PlanMap from "@/components/plan/PlanMap.vue";
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <PlanSelected :selected-items="selectedItems" />
        </v-col>
        
        <v-col cols="7">
          <PlanMap />
        </v-col>
        
        <v-col cols="3">
          <PlanSearch :items="items" @select="addSelectedItem" @dateSelected="handleDateSelected" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      start_date : "2024-05-18",
      end_date : "2024-05-18",

      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      selectedItems: []
    };
  },
  methods: {
    addSelectedItem(item) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    },
    handleDateSelected() {
      
    }
  }
};
</script>

<style>
.v-img {
  border-radius: 8px;
}
</style>
