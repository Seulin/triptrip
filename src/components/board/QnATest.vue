<template>
  <a-table :columns="columns" :data-source="data" 
      :pagination="{ pageSize: 10, position:['bottomCenter'], hideOnSinglePage:true }">
    <template #bodyCell="{ column, record }" >
      <template v-if="column.key === 'name'">
        <a> {{ record.name }}  </a>
      </template>
      <template v-else-if="column.key === 'category'">
        <span>
          <a-tag
            v-for="tag in record.category"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'isAnswer'">
        <a> {{ record.isAnswer ? "Yes" : "No" }}  </a>
      </template> 
    </template>
  </a-table>
</template>
<script setup>

const columns = [
  
  {
    name: 'No',
    dataIndex: 'articleNo',
    key: 'articleNo',
  },
  {
    title: '질문 유형',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '질문 내용',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '질문자',
    key: 'userId',
    dataIndex: 'userId',
  },
  {
    title: '질문 일자',
    key: 'modifiedAt',
    dataIndex: 'modifiedAt'
  },
  {
    title: '답변여부',
    key: 'isAnswer',
    dataIndex: 'isAnswer'
  },
];
const data = [
  {
    articleNo: '1',
    category: ['nice', 'developer'],
    title: "titletitletitletitladfasdfasdfasdfasdfasdfasdfasdfe",
    userId: 'userId',
    modifiedAt: "2024-10-24",
    isAnswer: true,
    isPublic: true
  },
  {
    articleNo: '2',
    category: ['nice', 'developer'],
    title: "titletitletitletitle",
    userId: 'userId',
    modifiedAt: "2024-10-24",
    isAnswer: true,
    isPublic: true
  },
  {
    articleNo: '3',
    category: ['nice', 'developer'],
    title: "titletitletitletitle",
    userId: 'userId',
    modifiedAt: "2024-10-24",
    isAnswer: true,
    isPublic: true
  },
];
</script>