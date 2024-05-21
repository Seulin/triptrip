<template>
    <v-container>
      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="index" @click="selectItem(item)">
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-divider class="my-4"></v-divider>
      
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Choose a date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="saveDate">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      items: Array
    },
    data() {
      return {
        menu: false,
        date: null
      };
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item);
      },
      saveDate() {
        this.menu = false;
        this.$emit('dateSelected', this.date);
      }
    }
  };
  </script>
  
  <style scoped>
  .v-list-item {
    cursor: pointer;
  }
  </style>
  