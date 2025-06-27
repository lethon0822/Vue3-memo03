<script setup>
import { reactive, onMounted } from 'vue';
import httpService from '@/services/HttpService';
import MemoCard from '@/components/MemoCard.vue';

const state = reactive({
  memo: [],
});

onMounted(() => {
  getItems({});
});
const getItems = async (param) => {
  const data = await httpService.getMemoList(param);
  state.memos = data.resultData;
  console.log('state.memos: ', state.memos);
};
</script>

<template>
  <div class="memo-list">
    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" />
    <router-link to="/memos/add" class="add btn btn-light">
      + 추가하기
    </router-link>
  </div>
</template>

<style lang="scss" scoped>



</style>
