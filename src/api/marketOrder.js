import {request} from './request';

export const fetchMarketOrders = (page, rows) => {
    return request({
        url: '/api/token/market-order/',
        method: 'get',
        params: {
            page: page,
            rows: rows,
        }
    });
};


export const createMarketOrder = order => {
    return request({
        url: '/api/token/market-order/',
        method: 'put',
        data: {
            ...order
        }
    });
};


export const findMarketOrderById = id => {
    return request({
        url: `/api/token/market-order/${id}`,
        method: 'get',
    });
};
