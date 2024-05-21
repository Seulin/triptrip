<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailQnA, deleteQnA } from "@/api/board";

const route = useRoute();
const router = useRouter();

// const qnano = ref(route.params.qnano);
const { qnano } = route.params;

const qna = ref({});

onMounted(() => {
  getQnA();
});

const getQnA = () => {
  const { qnano } = route.params;
  console.log(qnano + "번글 얻으러 가자!!!");
  detailQnA(
    qnano,
    ({ data }) => {
      console.log(data)
      qna.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
  
  // qna.value = {
  //   qnaNo: '1',
  //   category: ['nice', 'developer'],
  //   title: "titletitletitletitladfasdfasdfasdfasdfasdfasdfasdfe",
  //   content: "123412341234\n1234123412\n342341234123412341234",
  //   userId: 'userId',
  //   modifiedAt: "2024-10-24",
  //   isAnswer: true,
  //   isPublic: true
  // }
};

function moveList() {
  router.push({ name: "qna-list" });
}

function moveModify() {
  router.push({ name: "qna-modify", params: { qnano } });
}

function onDeleteQnA() {
  // const { qnano } = route.params;
  console.log(qnano + "번글 삭제하러 가자!!!");
  deleteQnA(
    qnano,
    (response) => {
      if (response.status == 200) moveList();
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ qna.qnaNo }}. {{ qna.title }}</h2>
        </div>

        <div class="row my-2">
          <p>작성자 : {{ qna.userId }}</p>
          <p>유형 : {{ qna.category }}</p>
          <p>작성일자 : {{ qna.modifiedAt }}</p>
          <p>공개여부 : {{ qna.public ? "Yes" : "No"}}</p>
          <p>내용 : {{ qna.content }}</p>
        </div>
        <div class="row"> 
      
          <!-- <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">안효인</span> <br />
                <span class="text-secondary fw-light">
                  {{ qna.modifiedAt }}1 조회 : {{ qna.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ qna.content }}
          </div> -->
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteQnA">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
