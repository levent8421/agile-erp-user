import {storageGet, USER_TOKEN_STORAGE_KEY} from './storage';

const token = storageGet(USER_TOKEN_STORAGE_KEY);
const data = {
    token: {
        tokenStr: token,
        user: {},
    }
};

export default data;
