import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  constructor() {
    console.log('HttpService 객체 생성');
  }

  async save(item) {
    console.log('item: ', item);
    const res = await axios.post('/memo', item);
    return res.data;
  }

  // get 메소드 호출 => 2번째 인자는 객체를 보내고 객체의 params 속성에 객체를 보내면 자동으로 쿼리스트링으로 변환
  async getMemoList(params) {
    const res = await axios.get('/memo', { params });
    console.log('getMemoList - res.data', res.data);
    return res.data;
  }

  // 수정하기 들어갔을 때 한번 호출
  async findById(id) {
    console.log('findById - id: ', id);
    const res = await axios.get(`/memo/${id}`);
    console.log('res.data', res.data)
    return res.data;
  }

  async modify(item) {
    console.log('modify - item: ', item);
    const res = await axios.put('/memo', item);
    return res.data;
  }

  async deleteMemo(params) {
    console.log('deleteMemo - params: ', params);
    const res = await axios.delete('/memo', { params });
    return res.data;
  }
}

export default new HttpService();
