import React, {Component} from 'react';
import mapStore from '../../store/storeAutoMapper';
import {findMarketOrderById} from '../../api/marketOrder';

class ConsoleMarketOrderDetails extends Component {
    state = {
        order: {},
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.orderId = id;
        this.setTitle('订单详情', `订单详情 ${this.orderId}`);
        this.refreshOrderInfo();
    }

    setTitle(title, subTitle) {
        const {setTitle} = this.props.actions;
        setTitle(title, subTitle);
    }

    refreshOrderInfo() {
        findMarketOrderById(this.orderId).then(res => {
            this.setState({order: res});
            this.setTitle('订单详情', res.orderNo);
        });
    }

    render() {
        return (
            <div className="order-details">
                asdas
            </div>
        );
    }
}

export default mapStore(ConsoleMarketOrderDetails);
