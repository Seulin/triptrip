<script setup>
import { watch } from "vue"

const props = defineProps({ selectedItems: Object })

watch(
  () => props.selectedItems,
  (value) => {
    console.log("props : ", value);
  },
  { immediate: true }
)

  
</script>

<template>
    <v-list dense>
        <v-list-item
            v-for="(item, index) in selectedItems"
            :key="index"
        >
            <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<style scoped></style>
