import React, {Component} from 'react';
import mapStore from '../../store/storeAutoMapper';

class ConsoleMarketOrders extends Component {
    state = {};

    componentDidMount() {
        const {setTitle} = this.props.actions;
        setTitle('市场订单管理', 'Market orders');
    }

    render() {
        return (
            <div className="market-orders">
                市场订单
            </div>
        );
    }
}

export default mapStore(ConsoleMarketOrders);
