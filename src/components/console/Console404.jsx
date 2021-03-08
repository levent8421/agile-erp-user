import React, {Component} from 'react';
import {Empty} from 'antd';
import mapStore from '../../store/storeAutoMapper';

class Console404 extends Component {
    componentDidMount() {
        console.log(this);
        const {setTitle} = this.props.actions;
        setTitle('页面找不到', '404 Notfound')
    }

    render() {
        const {url} = this.props.match;
        return (
            <div>
                <Empty description={`找不到[${url}]的路由`}/>
            </div>
        );
    }
}

export default mapStore(Console404);
