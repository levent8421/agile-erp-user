import React, {Component} from 'react';
import mapStore from '../../store/storeAutoMapper';
import {findMarketOrderById} from '../../api/marketOrder';
import {createOrderItem, fetchOrderItemsByOrder} from '../../api/marketOrderItem';
import {Button, Col, Form, Input, message, Modal, Row, Select, Table} from 'antd';
import {orderStateTable} from '../../metadata/orderState';
import './ConsoleMarketOrderDetails.less';
import {PlusOutlined} from '@ant-design/icons';
import PartSelectModal from '../commons/PartSelectModal';

class ConsoleMarketOrderDetails extends Component {
    state = {
        order: {},
        orderItems: [],
        partSelectVisible: false,
        selectedPart: {},
        pcsInputModalVisible: false,
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.orderId = id;
        this.setTitle('订单详情', `订单详情 ${this.orderId}`);
        this.refreshOrderInfo();
        this.refreshOrderItems();
    }

    refreshOrderItems() {
        const _this = this;
        fetchOrderItemsByOrder(this.orderId).then(res => {
            for (const item of res) {
                item.key = item.id;
            }
            _this.setState({orderItems: res});
        });
    }

    setTitle(title, subTitle) {
        const {setTitle} = this.props.actions;
        setTitle(title, subTitle);
    }

    refreshOrderInfo() {
        findMarketOrderById(this.orderId).then(res => {
            this.setState({order: res});
            this.setTitle('订单详情', res.orderNo);
            if (this.orderForm) {
                this.orderForm.setFieldsValue(res);
            }
        });
    }

    showPartSelect(show) {
        this.setState({
            partSelectVisible: show,
        });
    }

    showPcsInputModal(show) {
        this.setState({
            pcsInputModalVisible: show,
        })
    }

    onPartSelected(part) {
        this.setState({
            partSelectVisible: false,
            selectedPart: part,
        });
        this.showPcsInputModal(true);
    }

    addOrderItem(data) {
        const {selectedPart} = this.state;
        const orderId = this.orderId;
        const item = {
            marketOrderId: orderId,
            ...data,
            partId: selectedPart.id,
        };
        const _this = this;
        createOrderItem(item).then(res => {
            message.success(`订单项创建成功${res.id}`).then(() => {
                _this.showPcsInputModal(false);
                _this.refreshOrderItems();
            })
        });
    }

    renderOrderItemOperations(row) {
        return (<>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
        </>);
    }

    render() {
        const {order, orderItems, partSelectVisible, selectedPart, pcsInputModalVisible} = this.state;
        return (
            <div className="order-details">
                <Form ref={form => this.orderForm = form} initialValues={order}
                      onFinish={data => console.log(data)}>
                    <Row>
                        <Col span={12} className="form-split">
                            <Form.Item name="orderNo" label="订单号">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item name="customerName" label="客户信息">
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item name="deliveryAddress" label="发货地址">
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item name="remark" label="备注">
                                <Input.TextArea/>
                            </Form.Item>
                        </Col>
                        <Col span={12} className="form-split">
                            <Form.Item name="exceedDate" label="交货日期">
                                <Input/>
                            </Form.Item>
                            <Form.Item name="createTime" label="创建时间">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item name="updateTime" label="更新时间">
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item name="creator" label="创建人" getValueProps={creator => {
                                return {value: creator && creator.name}
                            }}>
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item name="state" label="状态">
                                <Select disabled={true}>
                                    {orderStateTable.map(item => (
                                        <Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" className="form-btn">保存</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrapper">
                    <div className="btns">
                        <Button icon={<PlusOutlined/>} type="primary"
                                onClick={() => this.showPartSelect(true)}>添加物料</Button>
                    </div>
                    <Table dataSource={orderItems}>
                        <Table.Column title="#" dataIndex="id"/>
                        <Table.Column title="物料" dataIndex="part"
                                      render={part => `${part.partNo}/${part.description}`}/>
                        <Table.Column title="数量" dataIndex="pcs"/>
                        <Table.Column title="备注" dataIndex="remark"/>
                        <Table.Column title="操作" render={row => this.renderOrderItemOperations(row)}/>
                    </Table>
                </div>
                <PartSelectModal visible={partSelectVisible}
                                 onSelect={record => this.onPartSelected(record)}
                                 onClose={() => this.showPartSelect(false)}/>
                <Modal visible={pcsInputModalVisible}
                       title={`为物料[${selectedPart.description}]设置数量`}
                       okText="确认"
                       cancelText="取消"
                       onOk={() => this.pcsInputForm && this.pcsInputForm.submit()}>
                    <Form ref={form => this.pcsInputForm = form} onFinish={data => this.addOrderItem(data)}>
                        <Form.Item label="数量" name="pcs" rules={[{required: true, message: '请输入数量'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="备注" name="remark">
                            <Input.TextArea/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStore(ConsoleMarketOrderDetails);
