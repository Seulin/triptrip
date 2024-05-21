<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getReviewList, createReview } from "@/api/review.js";
import TextClamp from 'vue3-text-clamp';

const tags = ref([
  { value: 12, label: '관광지' },
  { value: 14, label: '문화시설' },
  { value: 15, label: '축제공연행사' },
  { value: 25, label: '여행코스' },
  { value: 28, label: '레포츠' },
  { value: 32, label: '숙박' },
  { value: 38, label: '쇼핑' },
  { value: 39, label: '음식점' }
]);
const sidoList = ref([
  { "value": 1, "title": "서울" },
  { "value": 2, "title": "인천" },
  { "value": 3, "title": "대전" },
  { "value": 4, "title": "대구" },
  { "value": 5, "title": "광주" },
  { "value": 6, "title": "부산" },
  { "value": 7, "title": "울산" },
  { "value": 8, "title": "세종특별자치시" },
  { "value": 31, "title": "경기도" },
  { "value": 32, "title": "강원도" },
  { "value": 33, "title": "충청북도" },
  { "value": 34, "title": "충청남도" },
  { "value": 35, "title": "경상북도" },
  { "value": 36, "title": "경상남도" },
  { "value": 37, "title": "전라북도" },
  { "value": 38, "title": "전라남도" },
  { "value": 39, "title": "제주도" }
])

// title을 구분하기 위해 review: reviewTtile / plan: title

const router = useRouter();

const reviews = ref([]);

const imgSrc = ref();


const requestReviewList = () => {
  console.log("Request review list");
  getReviewList(
    ({ data }) => {

      reviews.value = data
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  requestReviewList();
});

function goDetailPage(reviewId) {
  router.push({ name: "review-detail", params: { reviewId: reviewId } });
}

function goWritePage() {
  let reviewId = -1;
  createReview(
    (data) => {
      console.log(data)
      reviewId = data.reviewId
    },
    (error) => {
      console.log(error);
    }
  );
  router.push({ name: "review-write", params: { reviewId: reviewId } });
}

const getImage = (city) => {
  return `/src/assets/img/city/${city}.jpg`;
}

</script>


<template>
  <div class="container">

    <v-autocomplete :items="reviews" append-inner-icon="mdi-microphone" class="mx-auto" density="comfortable"
      menu-icon="" placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" style="max-width: 350px;"
      theme="light" variant="solo" auto-select-first item-props rounded></v-autocomplete>

    <div class=" text-right my-3">
      <v-btn variant="outlined" @click="goWritePage">
        <v-icon icon="mdi-pencil" class="mr-1"></v-icon>후기 작성하기</v-btn>
    </div>
    <v-row>
      <v-col v-for="(review, idx) in reviews" :key="idx" cols="12" md="4">
        <v-card @click=goDetailPage(review.reviewId) link>
          <img :src="getImage(review.cityName)" width="100%">

          </img>

          <v-card-title class="text-h5">
            {{ review.reviewTitle }}
          </v-card-title>

          <v-card-text style="min-height:65px">
            <TextClamp :text="review.reviewTextContent" :max-lines="2">
            </TextClamp>

          </v-card-text>

          <v-card-actions class="text-grey-darken-3">

            <v-chip class="ml-2" variant="outlined" density="compact">{{ review.cityName }}</v-chip>
            <v-chip variant="text" density="compact" size="x-large" class="pl-3">
              {{ review.startDate }} - {{ review.endDate }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<style>
span {
  /* for span in the TextClamp  */
  font-size: medium;
}
</style>