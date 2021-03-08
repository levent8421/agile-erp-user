import React, {Component} from 'react';
import storeAutoMapper from '../store/storeAutoMapper';
import {Avatar, Layout, Menu, PageHeader} from 'antd';
import ContentFooter from './ContentFooter';
import ContentHeader from './ContentHeader';
import {AppstoreAddOutlined, ClusterOutlined, LineChartOutlined, UserOutlined} from '@ant-design/icons';
import AvatarImage from '../image/animation.jpg';
import './ConsoleDesk.less';
import {renderRoutes} from 'react-router-config';
import consoleRouters from '../router/consoleRouters';

const {Sider, Content} = Layout;

const menuPathTable = {
    statistics: '/c/',
    market: '/c/market-orders',
    plain: '/c/plain-orders',
    user: '/c/user',
};

class ConsoleDesk extends Component {
    componentDidMount() {
        const {user, tokenStr} = this.props.storeState.token;
        const {id} = user;
        if (!id && !tokenStr) {
            this.toLogin();
        }
    }

    toLogin() {
        this.props.history.push({
            pathname: '/login'
        });
    }

    onMenuSelected(menu) {
        const {key} = menu;
        const path = menuPathTable[key];
        if (!path) {
            console.warn('Can not find path for menuKey', key);
            return;
        }
        this.props.history.push({pathname: path});
    }

    render() {
        const {title} = this.props.storeState;
        return (
            <Layout className="console-desk">
                <ContentHeader/>
                <Layout>
                    <Sider>
                        <div className="menu-title">
                            <Avatar size="large" icon={<img src={AvatarImage} alt=""/>}/>
                        </div>
                        <Menu defaultSelectedKeys={[]}
                              defaultOpenKeys={[]}
                              mode="inline"
                              theme="dark"
                              className="menu"
                              onSelect={item => this.onMenuSelected(item)}>
                            <Menu.Item key="statistics" icon={<LineChartOutlined/>}>
                                统计分析
                            </Menu.Item>
                            <Menu.Item key="market" icon={<AppstoreAddOutlined/>}>
                                市场订单
                            </Menu.Item>
                            <Menu.Item key="plain" icon={<ClusterOutlined/>}>
                                计划订单
                            </Menu.Item>
                            <Menu.Item key="user" icon={<UserOutlined/>}>
                                信息维护
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className="content-wrapper">
                            <PageHeader title={title.title} subTitle={title.subTitle}/>
                            <div className="router-wrapper">
                                {renderRoutes(consoleRouters)}
                            </div>
                        </div>
                    </Content>
                </Layout>
                <ContentFooter/>
            </Layout>
        );
    }
}

export default storeAutoMapper(ConsoleDesk);
