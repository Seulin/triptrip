<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listQnA } from "@/api/board.js";

import VSelect from "@/components/common/VSelect.vue";
import BoardListItem from "@/components/board/item/QnAListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

const router = useRouter();

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "qna_no" },
  { text: "제목", value: "title" },
  { text: "작성자아이디", value: "user_id" },
]);

const qnas = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_QnA_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_QnA_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  getQnAList();
});

const changeKey = (val) => {
  console.log("BoarList에서 선택한 조건 : " + val);
  param.value.key = val;
};

const getQnAList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listQnA(
    param.value,
    ({ data }) => {
      console.log(data.qnas)
      qnas.value = data.qnas;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getQnAList();
};

const moveWrite = () => {
  router.push({ name: "qna-write" });
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글목록</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">
              글쓰기
            </button>
          </div>
          <div class="col-md-5 offset-5">
            <form class="d-flex">
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="param.word"
                  placeholder="검색어..."
                />
                <button class="btn btn-dark" type="button" @click="getQnAList">검색</button>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">유형</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
              <th scope="col">답변여부</th>
            </tr>
          </thead>
          <tbody>
            <BoardListItem
              v-for="qna in qnas"
              :key="qna.qnaNo"
              :qna="qna"
            ></BoardListItem>
          </tbody>
        </table>
      </div>
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<style scoped></style>
