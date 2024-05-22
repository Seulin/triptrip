<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getReviewDetail, deleteReview } from "@/api/review.js";

// 삭제 확인 팝업@@


const route = useRoute();
const router = useRouter();

const reviewData = ref({});

const plans = ref();
const selectedPlanId = 3;
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

// plan.js의 일부
function getPlanAttractions(planId, success, fail) {
  // local.get(`/plan/attractions/${planId}`).then(success).catch(fail);
  const data = [
    [
      { "attraction_id": 125452, "name": "서울", "title": "청계산", "addr1": "서울특별시 서초구 원터길", "lat": 37.44168677, "lng": 127.0543676 },
      { "attraction_id": 126479, "name": "서울", "title": "인왕산", "addr1": "서울특별시 종로구 인왕산로1길 29", "lat": 37.57356706, "lng": 126.9640832 },
      { "attraction_id": 126480, "name": "서울", "title": "관악산", "addr1": "서울특별시 관악구 관악로", "lat": 37.44840364, "lng": 126.9540988 },
      { "attraction_id": 126481, "name": "서울", "title": "도봉산", "addr1": "서울특별시 도봉구 도봉동", "lat": 37.69698701, "lng": 127.0184192 }
    ],
    [
      { "attraction_id": 125452, "name": "서울", "title": "청계산", "addr1": "서울특별시 서초구 원터길", "lat": 37.44168677, "lng": 127.0543676 },
      { "attraction_id": 126479, "name": "서울", "title": "인왕산", "addr1": "서울특별시 종로구 인왕산로1길 29", "lat": 37.57356706, "lng": 126.9640832 }
    ],
    [
      { "attraction_id": 130999, "name": "서울", "title": "고덕사회체육센터(실내수영장)", "addr1": "서울특별시 강동구 구천면로93길 12", "lat": 37.55115113, "lng": 127.168743 },
      { "attraction_id": 131008, "name": "서울", "title": "코오롱스포렉스(서초점)", "addr1": "서울특별시 서초구 서초대로70길 32", "lat": 37.4939496, "lng": 127.0234773 },
      { "attraction_id": 131009, "name": "서울", "title": "호텔롯데 휘트니스클럽", "addr1": "서울특별시 중구 을지로 30", "lat": 37.56547943, "lng": 126.9816347 }
    ],
    [
      { "attraction_id": 131136, "name": "서울", "title": "문래청소년수련관", "addr1": "서울특별시 영등포구 문래로 110", "lat": 37.51885827, "lng": 126.8940106 },
      { "attraction_id": 133225, "name": "서울", "title": "삼호복집 신촌", "addr1": "서울특별시 서대문구 연세로5다길 10", "lat": 37.55651296, "lng": 126.9349864 },
      { "attraction_id": 133248, "name": "서울", "title": "모닥불", "addr1": "서울특별시 동대문구 회기로8길 34", "lat": 37.59053314, "lng": 127.0409869 }
    ]

  ]
  success(data)
}

const requestPlanAttractions = () => {
  getPlanAttractions(
    selectedPlanId,
    (data) => {
      const newData = Array()
      // v-timeline에서 보여주기 위한 데이터 수정
      for (let day = 0; day < data.length; day++) {
        newData.push({ "title": `Day${day + 1}` })
        newData.push(...data[day])
      }

      console.log(newData)
      plans.value = newData
    },
    (error) => {
      console.log(error);
    }
  );
};

onMounted(() => {
  requestReviewDetail();
  requestPlanAttractions();
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
      <v-col cols="8">
        <v-row>

          <v-col class="text-h4 ma-2">
            {{ reviewData.reviewTitle }}

          </v-col>
        </v-row>


        <v-row justify="center" no-gutters>
          <v-col>
            <v-row>
              <v-col>


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

        <v-row justify="space-between">
          <v-col cols="8">



            <v-row justify="center">
              <v-col>
                <img :src="getImage(reviewData.cityName)" width="100%"></img>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col>
                <div class="ql-editor" v-html="reviewData.reviewHtmlContent">
                </div>

              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">

            <v-card variant="outlined">
              <v-card-title>
                <v-icon icon="mdi-airplane" start></v-icon>
                {{ reviewData.title }}
                <!-- 플랜 링크 추가하기! -->
                <!-- planTitle -->

              </v-card-title>
              <v-divider class="my-0"></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="auto" class="py-0">
                    <v-timeline direction="vertical" side="end">
                      <v-timeline-item v-for="(plan, i) in plans" :key="i" density="compact"
                        :size="plan.title.startsWith('Day') ? 'small' : 'x-small'"
                        :dot-color="plan.title.startsWith('Day') ? '' : 'grey'">

                        <div v-if="plan.title.startsWith('Day')" class="text-subtitle-1 font-weight-bold">{{ plan.title
                          }}
                        </div>
                        <div v-else> {{ plan.title }}
                          <p class="mb-0 text-grey">{{ plan.addr1 }}</p>
                        </div>
                      </v-timeline-item>

                    </v-timeline>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>



        </v-row>

        <v-divider></v-divider>
        <v-row justify="center">
          <v-col>
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
      </v-col>
    </v-row>
  </v-container>

</template>

<style>
.v-timeline--vertical.v-timeline {
  row-gap: 8px;
}

.v-card--variant-outlined {
  border-color: lightgray;
}
</style>