import {request} from './request';

export const fetchOrderItemsByOrder = orderId => {
    return request({
        url: '/api/token/market-order-item/_by-order',
        method: 'get',
        params: {
            orderId: orderId,
        }
    })
};


export const createOrderItem = item => {
    return request({
        url: '/api/token/market-order-item/',
        method: 'put',
        data: item,
    });
};
