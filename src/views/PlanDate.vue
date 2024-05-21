<script setup></script>

<template>
    <v-container>
        <v-row justify="space-around">
            <v-date-picker 
                v-model="start_date"
                color="primary"
                min="2024-05-23 ">
            </v-date-picker>

            <v-date-picker 
                v-model="end_date"
                color="primary"
                min=start_date>
            </v-date-picker>
        </v-row>
    </v-container>
</template>

<style scoped></style>