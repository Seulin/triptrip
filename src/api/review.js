import { localAxios } from "@/util/http-commons";



const plans = [
    {
        "planId": 0,
        "userId": "seul",
        "title": "plan 제목 1",
        "city": 2,
        "cityName": "인천",
        "startDate": "2024-05-23",
        "endDate": "2024-05-24"
    },
    {
        "planId": 1,
        "userId": "hyuk",
        "title": "plan 제목 2",
        "city": 2,
        "cityName": "제주도",
        "startDate": "2024-05-23",
        "endDate": "2024-05-24"
    },
    {
        "planId": 2,
        "userId": "seul",
        "title": "인천 뿌수기",
        "city": 2,
        "cityName": "충청북도",
        "startDate": "2024-05-21",
        "endDate": "2024-05-22"
    },
    {
        "planId": 3,
        "userId": "hyuk",
        "title": "title22222",
        "city": 2,
        "cityName": "인천",
        "startDate": "2024-05-21",
        "endDate": "2024-05-22"
    },

]

const reviews = [
    {
        userId: "seul",
        reviewId: 0, reviewTitle: '제주도 벚꽃길',
        reviewHtmlContent: `<p class="container">
        <h1>Trip Review</h1>
        
        <p class="review">
            <h2>Destination: Paris, France</h2>
            <img src="paris.jpg" alt="Paris">
            <p>I recently had the pleasure of visiting Paris, France. It was an amazing experience!</p>
            <p>The city is so rich in history and culture. The Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral were definitely highlights of the trip.</p>
            <p>The food was incredible as well. I enjoyed delicious pastries, crepes, and of course, French cuisine.</p>
            <p>I can't wait to visit again!</p>
        </p>
        
        <p class="review">
            <h2>Destination: Tokyo, Japan</h2>
            <img src="tokyo.jpg" alt="Tokyo">
            <p>My trip to Tokyo, Japan was unforgettable.</p>
            <p>The city is bustling with energy and there's always something new to explore. I loved wandering through the vibrant streets of Shibuya and Shinjuku.</p>
            <p>The cherry blossoms were in full bloom during my visit, creating a beautiful atmosphere throughout the city.</p>
            <p>And of course, the sushi in Tokyo is out of this world!</p>
        </p>
    </p>`,
        reviewTextContent: '텍스트 컨텐츠에요 html 아님.',
        planId: 2,
    },
    {
        userId: "hyuk",
        reviewId: 1, reviewTitle: '제주도 맛집',
        reviewHtmlContent: `<p class="ql-align-center">가운데 정렬</p><p>왼쪽</p><p class="ql-align-right">오른쪽</p>`,
        reviewTextContent: '텍스트 컨텐츠에요',
        planId: 1,
    },
    {
        userId: "hyuk",
        reviewId: 2, reviewTitle: '지혁이 축제 다녀온 후기',
        reviewHtmlContent: '<p><strong>스톨틀오롱ㅇ오오</strong><p>',
        reviewTextContent: "대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될 기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다. 정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다. 대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. \n\n 모든 국민은 학문과 예술의 자유를 가진다. 헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야 한다. 행정각부의 장은 국무위원 중에서 국무총리의 제청으로 대통령이 임명한다. 국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의 체결·비준에 대한 동의권을 가진다.",
        planId: 1,

    },
    {
        userId: "hyuk",
        reviewId: 3, reviewTitle: '고양이고양이고먐미 ㄱㅇㅇ',
        reviewHtmlContent: "<p>국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다. 혼인과 가족생활은 개인의 존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다. 이 헌법중 공무원의 임기 또는 중임제한에 관한 규정은 이 헌법에 의하여 그 공무원이 최초로 선출 또는 임명된 때로부터 적용한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 대한민국은 민주공화국이다. 대통령의 임기는 5년으로 하며, 중임할 수 없다. 대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다. \n            대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다. 모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 환경권의 내용과 행사에 관하여는 법률로 정한다. 정당은 그 목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다. 국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다. \n     모든 국민은 직업선택의 자유를 가진다. 감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다. 감사위원은 원장의 제청으로 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 법관은 헌법과 법률에 의하여 그 양심에 따라 독립하여 심판한다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.</p>",
        reviewTextContent: '텍스트 컨텐츠에요ㄴㅇㄹㅇㄴ',
        planId: 3,
    }
]




function getReviewList(success, fail) {
    // 파라미터: X
    // 반환: (리뷰+플랜) 목록
    const data = Array()
    for (let i = 0; i < reviews.length; i++) {
        data.push({ ...reviews[i], ...plans[reviews[i].planId] })
    }
    console.log('getReviewList')
    console.log(data)
    success({ data })

    // local.get(`/review`).then(success).catch(fail);  // 실제로 요청 보낼 주소
}

function getReviewDetail(reviewId, success, fail) {
    // 파라미터: reviewId = 0
    // 반환: 리뷰+플랜

    const review = reviews[reviewId] // reviews 순서대로 정렬돼있다고 가정함
    const plan = plans[review.planId] // reviews 순서대로 정렬돼있다고 가정함


    const data = { ...review, ...plan }
    console.log('getReviewDetail')
    console.log(data)
    success(data)
    // local.get(`/review/${reviewId}`).then(success).catch(fail);  // 실제로 요청 보낼 주소
}


function createReview(success, fail) {
    // 파라미터: X
    // 반환: reviewId = 0

    const reviewId = reviews.length

    reviews.push({ reviewId: reviewId })

    const data = { reviewId: reviewId }
    console.log('createReview')
    console.log(data)
    success(data)
    // local.post(`/review`).then(success).catch(fail);  // 실제로 요청 보낼 주소
}

function updateReview(reviewData, success, fail) {
    // 파라미터: reviewData = {userId, reviewId, reviewTitle, reviewHtmlContent, reviewTextContent, planId}
    // 반환: X

    console.log(reviewData)

    reviews[reviewData.reviewId].reviewTitle = reviewData.reviewTitle
    reviews[reviewData.reviewId].reviewHtmlContent = reviewData.reviewHtmlContent
    reviews[reviewData.reviewId].reviewTextContent = reviewData.reviewTextContent
    reviews[reviewData.reviewId].planId = reviewData.planId

    console.log('updateReview')
    console.log(reviewData)
    // success(reviews[id].content)
    // local.put(`/review`, JSON.stringify(reviewData)).then(success).catch(fail);  // 실제로 요청 보낼 주소
}

function deleteReview(reviewId, success, fail) {
    console.log('deleteReview')
    console.log(reviewId)
    reviews.splice(reviewId, 1);

    // local.delete(`/review/${reviewId}`).then(success).catch(fail);  // 실제로 요청 보낼 주소
}


export {
    getReviewList,
    getReviewDetail,
    // getAttractionInfo,
    createReview,
    updateReview,
    deleteReview
};



const attractions = [
    {
        id: 0, attraction_title: '스타벅스 영등포구청역점', attraction_addr1: '어드레스1', attraction_addr2: '어드레스2', attraction_zipcode: '집코드',
        attraction_sido: '서울시', attraction_gugun: '영등포구',
        attraction_tel: '03040-403-4',
        attraction_type: '관광지',
        attraction_image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    },
    {
        id: 1, attraction_title: '스타벅스 영등포구청역점', attraction_addr1: '어드레스1', attraction_addr2: '어드레스2', attraction_zipcode: '집코드',
        attraction_sido: '서울시', attraction_gugun: '영등포구',
        attraction_tel: '03040-403-4',
        attraction_type: '문화시설',
        attraction_image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    },
    {
        id: 2, attraction_title: '스타벅스 영등포구청역점', attraction_addr1: '어드레스1', attraction_addr2: '어드레스2', attraction_zipcode: '집코드',
        attraction_sido: '서울시', attraction_gugun: '영등포구',
        attraction_tel: '03040-403-4',
        attraction_type: '축제공연행사',
        attraction_image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    },
    {
        id: 3, attraction_title: '스타벅스 영등포구청역점', attraction_addr1: '어드레스1', attraction_addr2: '어드레스2', attraction_zipcode: '집코드',
        attraction_sido: '서울시', attraction_gugun: '영등포구',
        attraction_tel: '03040-403-4',
        attraction_type: '숙박',
        attraction_image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    },
]


