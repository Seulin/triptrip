<script setup>
import { ref, watch, onMounted, reactive, onBeforeUpdate } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // ??
import { getReviewDetail, createReview, updateReview } from "@/api/review.js";

// @@ vue formmater 설정 바꿔서 다시 해보기
const route = useRoute();
const router = useRouter();


const saving = ref(true);
const savingAvailable = ref(true);
const reviewEditor = ref(null);

let reviewData = reactive({
    // userId: "hyuk",
    // reviewTitle: '',
    // reviewHtmlContent: '',
    // planId: 0,
});

watch(reviewData, (newReview, oldReview) => {
    console.log('watching data');
    console.log(newReview)
    console.log(oldReview)
    autoSave();
})

function autoSave() {
    //  실제로는 변경될 때마다 저장하지만, 프런트에서는 최대 5초에 한 번씩 저장되게 보임
    if (savingAvailable.value) {
        savingAvailable.value = false;
        setTimeout(() => {
            savingAvailable.value = true;
        }, 5000)

        saving.value = true;
        setTimeout(() => {
            saving.value = false;
        }, 1000)
    }

    const updatedReview = {
        userId: reviewData.userId,
        reviewId: reviewData.reviewId,
        reviewTitle: reviewData.reviewTitle,
        reviewHtmlContent: reviewData.reviewHtmlContent,
        reviewTextContent: reviewEditor.value.getText(),
        planId: reviewData.planId
    }


    updateReview(
        updatedReview,
        ({ data }) => {
            console.log(data)
        },
        (error) => {
            console.log(error);
        }
    )
}


onMounted(() => {
    const { reviewId } = route.params;

    getReviewDetail(
        reviewId,
        (data) => {
            // 실제로는 ({ data }) 가 맞게 동작하는 걸 수도 있음?
            reviewData.userId = data.userId;
            reviewData.planId = data.planId;
            reviewData.reviewId = reviewId;
            reviewData.reviewTitle = data.reviewTitle;
            reviewData.reviewHtmlContent = data.reviewHtmlContent;
            // reviewData.reviewTextContent = data.reviewTextContent;
            reviewData.title = data.title;
            reviewData.cityName = data.cityName;
            reviewData.startDate = data.startDate;
            reviewData.endDate = data.endDate;
        },
        (error) => {
            console.log(error);
        }
    );


})

function goDetailPage(reviewId) {
    router.push({ name: "review-detail", params: { reviewId: reviewId } });
}


</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6">
                <v-autocomplete clearable label="Autocomplete"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"></v-autocomplete>

            </v-col>
        </v-row>

        <div class="text-center">
            <div>
                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-airplane" start></v-icon>
                    {{ reviewData.title }}
                    <!-- planTitle -->
                </v-chip>
            </div>
            <div>
                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-map-marker" start></v-icon>
                    {{ reviewData.cityName }}
                </v-chip>
            </div>
            <div>

                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-calendar" start></v-icon>
                    {{ reviewData.startDate }} ~ {{ reviewData.endDate }}
                </v-chip>
            </div>
        </div>
        <!-- <v-row>
            <v-col cols="9"> -->

        <v-row justify="center">
            <v-col cols="6">
                <v-textarea class="text-center" v-model="reviewData.reviewTitle" placeholder="제목" row-height="30"
                    rows="1" variant="underlined" auto-grow></v-textarea>

            </v-col>
        </v-row>



        <v-row justify="center" no-gutters>
            <v-col cols="10" class="text-right">

                <v-btn v-if="saving" size="small" variant="plain" readonly>

                    <v-progress-circular class="mr-1" indeterminate size="x-small" width="2"></v-progress-circular>
                    저장 중

                </v-btn>

                <v-btn v-else size="small" variant="plain" readonly>

                    <v-icon icon="mdi-check"></v-icon>
                    저장 완료

                </v-btn>
            </v-col>

        </v-row>
        <v-row justify="center" no-gutters>
            <v-col cols="10">



                <QuillEditor ref="reviewEditor" toolbar="full" contentType="html"
                    v-model:content="reviewData.reviewHtmlContent" />
            </v-col>

        </v-row>
        <!-- 
            </v-col>
            <v-col cols="3">
                <v-timeline align="start" direction="vertical" side="end">
                    <v-timeline-item
                        v-for="day in days"
                        :key=""
                        >
                        <template v-slot:opposite>
                            Opposite content
                        </template>
<div>
    <div class="text-h6">Content title</div>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore
        magna aliqua.
    </p>
</div>
</v-timeline-item>
</v-timeline>
</v-col> -->

        <v-row justify="center">
            <v-col cols="auto">

                <v-btn size="large" variant="outlined" color="primary" @click="goDetailPage(reviewData.reviewId)">
                    <v-icon icon="mdi-content-save" start></v-icon>
                    등록하기
                </v-btn>
            </v-col>
        </v-row>

        <!-- </v-row> -->
    </v-container>
</template>


<style>
.v-textarea textarea {
    font-size: xx-large;
    text-align: center;
}

.ql-container {
    height: 60vh;
}
</style>