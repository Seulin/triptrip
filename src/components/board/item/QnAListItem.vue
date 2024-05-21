<script setup>
defineProps({ qna: Object });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ qna.qnaNo }}</th>
    <td>{{ qna.category }}</td>
    <td class="text-start">
        <!-- {{ qna.title }} -->
      <router-link
        :to="{ name: 'qna-view', params: { qnano: qna.qnaNo } }"
        class="qna-title link-dark"
      >
        {{ qna.title }}
      </router-link>
    </td>
    <td>{{ qna.userId }}</td>
    <td>{{ qna.modifiedAt }}</td>
    <td>{{ qna.answer ? "Yes" : "No" }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
