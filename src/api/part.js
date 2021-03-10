import {request} from './request';

export const search = (name, max) => {
    return request({
        url: '/api/token/part/_search',
        method: 'get',
        params: {
            name: name,
            max: max
        }
    });
};
