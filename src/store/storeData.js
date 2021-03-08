import {storageGet, USER_TOKEN_STORAGE_KEY} from './storage';

const token = storageGet(USER_TOKEN_STORAGE_KEY);
const data = {
    token: {
        tokenStr: token,
        user: {},
    },
    title: {
        title: 'Agile-ERP',
        subTitle: 'Agile-ERP',
    }
};

export default data;
