import axios from "axios";

class HttpService {
    async postMemo(item) {
        console.log('item: ', item);
    }

    async getMemoList(params) {
        console.log('getMemoList - params: ', params);
    }

    async getMemo(id) {
        console.log('getMemo - id: ', id);
    }

    async PutMemo(item) {
        console.log('putMemo - item: ', item);
    }

    async DeleteMemo(params) {
        console.log('deleteMemo - params: ', params)
    }
}

export default new HttpService();