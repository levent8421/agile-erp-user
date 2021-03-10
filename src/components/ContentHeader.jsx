import React, {Component} from 'react';
import {Avatar, Button, Layout, Menu} from "antd";
import './ContentHeader.less';
import {withRouter} from 'react-router-dom';
import mapStore from '../store/storeAutoMapper';
import avatarImage from '../image/animation.jpg';
import Logo from '../image/logo.png';

const {Header} = Layout;

class ContentHeader extends Component {
    renderUserAvatar() {
        const {user} = this.props.storeState.token;
        if (user.id) {
            return (<div className="user-avatar">
                <span className="text">{user.name}</span>
                <span className="text">|</span>
                <Avatar className="avatar" icon={<img src={avatarImage} alt="avatar"/>}/>
            </div>);
        }
        return (<div className="login-links">
            <Button type="link">登录</Button>
            <span>|</span>
            <Button type="link">注册</Button>
        </div>);
    }

    onMenuClick(menuItem) {
        const {key} = menuItem;
        let path = '/';
        switch (key) {
            case 'console_home':
                path = '/c/';
                break;
            case 'console_plain':
                path = '/c/plain';
                break;
            default:
                path = '/';
        }
        this.props.history.push({pathname: path});
    }

    render() {
        return (
            <Header className="content-header">
                <span className="logo">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Agile-ERP"/>
                    </div>
                </span>
                <Menu theme="dark" mode="horizontal" onClick={item => this.onMenuClick(item)}>
                    <Menu.Item key="console_home">控制台</Menu.Item>
                    <Menu.Item key="console_plain">生产计划</Menu.Item>
                    <Menu.Item key="console_storage">出入库</Menu.Item>
                    <Menu.Item key="console_cha">采购任务</Menu.Item>
                    <Menu.Item key="console_msg">系统消息</Menu.Item>
                </Menu>
                <div className="user-avatar">
                    {
                        this.renderUserAvatar()
                    }
                </div>
            </Header>
        );
    }
}

export default withRouter(mapStore(ContentHeader));
