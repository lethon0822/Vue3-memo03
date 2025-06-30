<script setup>
import { reactive, onMounted } from 'vue';
import httpService from '@/services/httpService';
import MemoCard from '@/components/MemoCard.vue';

// 통신했을 때 resultData(JSON 데이터)가 객체화되어 넘어옴
// 배열로 받는 이유는 배열로 받기 때문이다...
const state = reactive({
  memos: [],
});

onMounted(() => {
  getItems({});
});

// get과 delete 작업이 한 공간 안에 있도록 하기 위해 작업
const getItems = async (param) => {
  const data = await httpService.getMemoList(param);
  state.memos = data.resultData;
  console.log('state.memos: ', state.memos);
};

const removeItem = async (id) => {
  //  이부분 다시 분석할 필요가 있음
  if (confirm('삭제하시겠습니까?')) {
    console.log('삭제하겠다.');
    const params = { memo_id: id };
    const data = await httpService.deleteMemo(params);
    if (data.resultData === 1) {
      // getItems({});
      const deleteIdx = state.memos.findIndex((item) => item.id === id);
      if (deleteIdx >= 0) {
        state.memos.splice(deleteIdx, 1);
      }
    }
  }
};
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add w-100 btn btn-light">
      + 추가하기
    </router-link>

    <MemoCard
      @delete-item="removeItem"
      v-for="m in state.memos"
      :item="m"
      :key="m.id"
    />
  </div>
</template>

<style lang="scss" scoped></style>
