<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewDetail, deleteReview } from "@/api/review.js";

// 삭제 확인 팝업@@


const route = useRoute();
const router = useRouter();

const reviewData = ref({});

const cols = "10";
const lg_cols = "7";

const login_id = "hyuk";

const getImage = (city) => {
  return `/src/assets/img/city/${city}.jpg`;
}

const requestReviewDetail = () => {
  const { reviewId } = route.params;
  console.log("Request review Detail", reviewId);
  getReviewDetail(
    reviewId,
    (data) => {
      // 실제로는 ({ data }) 가 맞게 동작하는 걸 수도 있음?
      reviewData.value = data
      console.log(data)
    },
    (error) => {
      console.log(error);
    }
  );
};

const requestReviewDetele = (reviewId) => {
  deleteReview(
    reviewId,
    (data) => {
      // 실제로는 ({ data }) 가 맞게 동작하는 걸 수도 있음?
      console.log(data)
    },
    (error) => {
      console.log(error);
    }
  );
  router.push({ name: "review-list" });
}


onMounted(() => {
  requestReviewDetail();
});

function goListPage() {
  router.push({ name: "review-list" });
}

function goWritePage(reviewId) {
  router.push({ name: "review-write", params: { reviewId: reviewId } });
}



</script>

<template>
  <v-container class="justify-center">

    <v-row justify="center">
      <v-col :cols="cols" :lg="lg_cols" class="text-h4 my-5">
        {{ reviewData.reviewTitle }}

      </v-col>
    </v-row>

    <v-row justify="center" no-gutters>
      <v-col :cols="cols" :lg="lg_cols">
        <v-row>
          <v-col>
            <v-chip variant="text" density="compact" size="x-large">
              <v-icon icon="mdi-airplane" start></v-icon>
              {{ reviewData.title }}
              <!-- planTitle -->
            </v-chip>
            <br>
            <v-chip variant="text" density="compact" size="x-large">
              <v-icon icon="mdi-map-marker" start></v-icon>
              {{ reviewData.cityName }}
            </v-chip>
            <br>
            <v-chip variant="text" density="compact" size="x-large">
              <v-icon icon="mdi-calendar" start></v-icon>
              {{ reviewData.startDate }} ~ {{ reviewData.endDate }}
            </v-chip>
          </v-col>
          <v-col v-if="login_id == reviewData.userId" align-self="end">
            <v-row justify="end" no-gutters>
              <v-col cols="auto" class="mr-2">
                <v-btn variant="outlined" class="px-2" size="small" color="grey"
                  @click="goWritePage(reviewData.reviewId)">
                  <!-- <v-icon icon="mdi-pencil"></v-icon> -->
                  수정
                </v-btn>
              </v-col>

              <v-col cols="auto">
                <v-btn variant="outlined" class="px-2" size="small" color="deep-orange-lighten-2"
                  @click="requestReviewDetele(reviewData.reviewId)">
                  <!-- <v-icon icon="mdi-trash-can"></v-icon> -->
                  삭제
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>



    <v-divider></v-divider>


    <v-row justify="center">
      <v-col :cols="cols" :lg="lg_cols">
        <img :src="getImage(reviewData.cityName)" width="100%"></img>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col :cols="cols" :lg="lg_cols">
        <div class="ql-editor" v-html="reviewData.reviewHtmlContent">
        </div>

      </v-col>
    </v-row>





    <v-divider></v-divider>
    <v-row justify="center">
      <v-col :cols="cols" :lg="lg_cols">
        @댓글.. 영역
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn variant="outlined" prepend-icon="mdi-menu" @click="goListPage">
          목록
        </v-btn>
      </v-col>

    </v-row>
  </v-container>

</template>
