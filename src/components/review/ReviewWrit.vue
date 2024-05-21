<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // ??
import { getReviewDetail, createReview, updateReview } from "@/api/review.js";

// @@ vue formmater 설정 바꿔서 다시 해보기

const route = useRoute();
let reviewData = reactive({
    userId: 30,
    reviewTitle: '',
    reviewHtmlContent: '',
});
const saving = ref(false);
const savingAvailable = ref(true);
const reviewEditor = ref(null);

// const reviewHtmlContent = ref('e');


let skip_watch = true;

watch(reviewData, (newReview, oldReview) => {
    // reviewData가 변경되면 자동으로 저장하기
    if (skip_watch) {
        // 첫번째 데이터로 로딩은 감시하지 않음.
    } else {
        skip_watch = false;
        console.log('watching data');
        console.log(newReview)
        autoSave();
    }

})

function autoSave() {
    //  실제로는 변경될 때마다 저장하지만(요청을 보내지만), 프런트에서 로딩은 최대 5초에 한 번씩 저장되게 보임
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

    // 텍스트 버전의 컨텐츠도 포함하기

    // const reviewTextContent = reviewEditor.value.getText()
    const reviewTextContent = 'reviewEditor.value.getText()'
    console.log(reviewTextContent)
    updateReview(
        { ...reviewData.value, ...reviewTextContent },
        ({ data }) => {
            console.log(data)
        },
        (error) => {
            console.log(error);
        }
    )
    // saving.value = false;
}


onMounted(() => {
    const { reviewId } = route.params;

    if (!reviewId) {
        // 새로 작성
        console.log('post new review')
        createReview( // @@ ref에 맞게
            reviewData,
            ({ data }) => {
                console.log(data)
                reviewData.reviewId = data
            },
            (error) => {
                console.log(error);
            }
        );
    } else {
        console.log(reviewId, 'get detail');
        getReviewDetail(
            reviewId,
            (data) => {
                // 실제로는 ({ data }) 가 맞게 동작하는 걸 수도 있음?
                reviewData = data
                // console.log(reviewData.value)
                // reviewData.reviewTitle = data.reviewTitle
                // reviewData.review

                // reviewEditor.value.setHTML(data.reviewHtmlContent);
            },
            (error) => {
                console.log(error);
            }
        );

    }

})

function setEditorContent(quill) {
    // console.log('readyready')
    // console.log(quill.setHTML())
    console.log('rew')

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

        <v-row justify="center">
            <v-col cols="6">
                <v-textarea class="text-center" v-model="reviewData.reviewTitle" placeholder="제목" row-height="30"
                    rows="1" variant="underlined" auto-grow></v-textarea>
                <!-- 제목 저장하는 거, 제목 데이터 가져와서 autosave 가능하게 -->
                <!-- <v-text-field
                
                :loading="loading"
                placeholder="제목"
                variant="underlined"
                clearable
                ></v-text-field> -->
                <!-- @@ 지혁이한테 데이트피커, 셀렉트 컴포넌트 보내달라고 하기 -->

            </v-col>
        </v-row>



        <div class="text-center">
            <div>
                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-airplane" start></v-icon>
                    {{ 'plan title' }}
                    <!-- planTitle -->
                </v-chip>
            </div>
            <div>
                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-map-marker" start></v-icon>
                    {{ '인천' }}
                </v-chip>
            </div>
            <div>

                <v-chip variant="text" density="compact">
                    <v-icon icon="mdi-calendar" start></v-icon>
                    {{ '2343-349' }} ~ {{ '3340-349' }}
                </v-chip>
            </div>
        </div>
        <v-row justify="center" no-gutters>
            <v-col cols="10" class="text-right">




                <div v-if="saving" size="small" variant="plain" readonly>

                    <v-progress-circular class="mr-1" indeterminate size="x-small" width="2"></v-progress-circular>
                    저장 중

                </div>

                <v-btn v-else="saving" size="small" variant="plain" readonly>

                    <v-icon icon="mdi-check"></v-icon>
                    저장 완료

                </v-btn>
            </v-col>

        </v-row>
        <v-row justify="center" no-gutters>
            <v-col cols="10">
                <!-- <div class="pt-12"> -->


                <QuillEditor ref="reviewEditor" toolbar="full" contentType="html"
                    v-model:content="reviewData.reviewHtmlContent" @ready="setEditorContent" />
                <!-- @textCahnge="" -->
                <!-- </div> -->
            </v-col>

        </v-row>
        <v-row justify="center">
            <v-col cols="auto">

                <v-btn size="large" variant="outlined" color="primary">
                    <v-icon icon="mdi-content-save" start></v-icon>
                    등록하기
                </v-btn>
            </v-col>
        </v-row>
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