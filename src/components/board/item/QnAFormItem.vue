<script setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { registQnA, getQnA, modifyQnA } from "@/api/board"


const router = useRouter()
const route = useRoute()

const props = defineProps({ type: String })


const qna = ref({
    // qnaNo: '1',
    category: "ETC",
    title: "",
    content: "",
    userId: 'ssafy1234',
    public : true
    // modifiedAt: "2024-10-24",
    // isAnswer: true,
    // isPublic: true
})

const selectOption = ref([
  { text: "서비스", value: "SERVICE" },
  { text: "기술", value: "TECH" },
  { text: "컨텐츠", value: "CONTENTS" },
  { text: "피드백", value: "FEEDBACK" },
  { text: "보안", value: "PRIVATEINFO" },
  { text: "기타", value: "ETC" },
]);


if (props.type === "modify") {
  let { qnano } = route.params
  console.log(qnano + "번글 얻어와서 수정할거야")
  getQnA(
    qnano,
    ({ data }) => {
      qna.value = data
      console.log(data)
    },
    (error) => {
      console.log(error)
    }
  )
}

const titleErrMsg = ref("")
const contentErrMsg = ref("")
watch(
  () => qna.value.title,
  (value) => {
    let len = value.length
    if (len == 0 || len > 45) {
      titleErrMsg.value = "제목을 확인해 주세요!!!"
    } else titleErrMsg.value = ""
  },
  { immediate: true }
)
watch(
  () => qna.value.content,
  (value) => {
    let len = value.length
    if (len == 0 || len > 1000) {
      contentErrMsg.value = "내용을 확인해 주세요!!!"
    } else contentErrMsg.value = ""
  },
  { immediate: true }
)

function onSubmit() {
  // event.preventDefault();

  if (titleErrMsg.value) {
    alert(titleErrMsg.value)
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value)
  } else {
    props.type === "regist" ? writeQnA() : updateQnA()
  }
}

function writeQnA() {
  console.log("글등록하자!!", qna.value)
  registQnA(
    qna.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다."
      if (response.status == 201) msg = "글등록이 완료되었습니다."
      alert(msg)
      moveList()
    },
    (error) => console.log(error)
  )
}

function updateQnA() {
  console.log(qna.value.qnaNo + "번글 수정하자!!", qna.value)
  modifyQnA(
    qna.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다."
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다."
      alert(msg)
      moveList()
      // router.push({ name: "qna-view" });
      // router.push(`/board/view/${qna.value.qnaNo}`);
    },
    (error) => console.log(error)
  )
}

function moveList() {
  router.replace({ name: "qna-list" })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="qna.userId"
        :disabled="true"
        placeholder="작성자ID..."
      />
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="qna.title" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="category" class="form-label">유형 : </label>
      <select v-model="qna.category" class="form-select-sm ms-2 w-50">
        <option
          v-for="option in selectOption"
          :key="option.value"
          :value="option.value"
          :disabled="option.value === '' ? true : false"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div v-if="type === 'regist'" class="mb-3">
      <label for="public" class="form-label">공개여부 : </label>
      <input type="checkbox"  v-model="qna.public" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="qna.content" rows="10"></textarea>
    </div>
    <!-- <div class="mb-3">
      <label for="isPublic" class="form-label">공개 여부 : </label>
      <input type="checkbox" v-model="qna.public" />
    </div> -->
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
