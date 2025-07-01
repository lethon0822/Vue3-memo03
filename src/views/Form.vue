<script setup>
import { reactive, onMounted, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import httpService from '@/services/httpService';
// 컴포넌트만 중괄호로 감싸서 import 해야 함

const router = useRouter(); // 주소 이동(라우터 처리)
const route = useRoute(); // PathVariable 데이터 가져오기 위한 용도
const refTitle = useTemplateRef('ref_title');
const refCtnts = useTemplateRef('ref_ctnts');

const state = reactive({
  memo: {
    memoId: 0,
    title: '',
    ctnts: '',
    createdAt: '',
  },
});

const submit = async () => {

  // 제목에 내용이 없다면 alert('제목을 작성해주세요.')
  // 내용에 내용이 없다면 alert('내용을 작성해주세요.')
  if (state.memo.title.trim().length === 0) {
    alert('제목을 작성해주세요.');
    refTitle.value.focus();
    return;
  } else if (state.memo.title.trim().length > 20) {
    alert('제목은 20자 이내로 작성해주세요.');
    refTitle.value.focus();
    return;
  } else if (state.memo.ctnts.trim().length === 0) {
    alert('내용을 작성해주세요.');
    refCtnts.value.focus();
    return;
  } else if (state.memo.ctnts.trim().length > 200) {
    alert('내용은 200자 이내로 작성해주세요.');
    refCtnts.value.focus();
    return;
  }

  console.log('submit 호출');
  let data = null;
  const bodyJSON = {
    title: state.memo.title,
    ctnts: state.memo.ctnts,
  };

  if (route.params.memoId) {
    // 수정 처리
    bodyJSON.memoId = state.memo.memoId;
    data = await httpService.modify(state.memo);
  } else {
    // 등록 처리
    data = await httpService.save(bodyJSON);
  }

  if (data.resultData === 1) {
    // 등록이나 수정 성공시
    // 홈 화면으로 라우터 처리
    router.push({ path: '/' });
  } else {
    // 등록 실패
    alert(data.resultMessage);
  }
};

const findById = async () => {
  const data = await httpService.findById(route.params.memoId);
  state.memo = data.resultData;
};

onMounted(() => {
  if (route.params.memoId) {
    findById();
  }
});
</script>

<template>
  <!-- prevent : 버튼에서 발생하는 이벤트  -->
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        ref="ref_title"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="ctnts" class="form-label">내용</label>
      <textarea
        ref="ref_ctnts"
        id="ctnts"
        class="form-control p-3"
        v-model="state.memo.ctnts"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-03">저장</button>
  </form>
</template>

<style scoped></style>
