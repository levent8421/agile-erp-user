import React, {Component} from 'react';
import ContentHeader from './ContentHeader';
import ContentFooter from './ContentFooter';
import {Button, Card, Col, Form, Input, message, Row} from 'antd';
import './Login.less';
import {login} from '../api/user';
import mapStore from '../store/storeAutoMapper';

class Login extends Component {
    componentDidMount() {
        const {tokenStr} = this.props.storeState.token;
        if (tokenStr) {
            this.props.history.replace({pathname: '/'});
        } else {
            console.log('Login');
        }
    }

    doLogin(data) {
        login(data).then(res => {
            const {token, account} = res;
            this.props.actions.setToken(token, account);
            message.success('登录成功').then(() => '');
            this.props.history.push({pathname: '/'});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="login">
                <ContentHeader/>
                <Row className="login-content">
                    <Col span={6}/>
                    <Col span={12}>
                        <Card title="登录" className="form-card">
                            <Form labelCol={{span: 4}} wrapperCol={{span: 20}} onFinish={data => this.doLogin(data)}>
                                <Form.Item label="登录名" name="loginName" rules={[{required: true, message: '请输入登录名'}]}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
                                    <Input.Password/>
                                </Form.Item>
                                <Form.Item wrapperCol={{offset: 4, span: 20}}>
                                    <Button htmlType="submit" type="primary">登录</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={6}/>
                </Row>
                <ContentFooter/>
            </div>
        );
    }
}

export default mapStore(Login);
