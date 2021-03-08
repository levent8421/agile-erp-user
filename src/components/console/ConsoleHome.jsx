import React, {Component} from 'react';
import mapStore from '../../store/storeAutoMapper';

class ConsoleHome extends Component {
    state = {};

    componentDidMount() {
        const {setTitle} = this.props.actions;
        setTitle('统计分析', 'ERP 统计分析');
    }

    render() {
        return (
            <div>
                统计分析
            </div>
        );
    }
}

export default mapStore(ConsoleHome);
