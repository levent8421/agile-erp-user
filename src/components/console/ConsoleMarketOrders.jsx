import React, {Component} from 'react';
import mapStore from '../../store/storeAutoMapper';
import {createMarketOrder, fetchMarketOrders} from '../../api/marketOrder';
import {Button, DatePicker, Form, Input, message, Modal, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import './ConsoleMarketOrders.less';

const {TextArea} = Input;
const ROWS = 20;

class ConsoleMarketOrders extends Component {
    state = {
        orders: [],
        currentPage: 1,
        rows: ROWS,
        totalRows: 0,
        createModalVisible: false,
    };

    componentDidMount() {
        const {setTitle} = this.props.actions;
        setTitle('市场订单管理', 'Market orders');
        this.refreshOrders();
    }

    refreshOrders(page = 1, rows = ROWS) {
        fetchMarketOrders(page, rows).then(res => {
            const {list, pageNum, pageSize, total} = res;
            for (const order of list) {
                order.key = order.id;
            }
            this.setState({
                orders: list,
                currentPage: pageNum,
                rows: pageSize,
                totalRows: total,
            });
        });
    }

    showCreateModal(show) {
        this.setState({
            createModalVisible: show,
        })
    }

    createOrder(data) {
        data.exceedDate = data.exceedDate.format('YYYY-MM-DD HH:mm:ss');
        const _this = this;
        createMarketOrder(data).then(res => {
            message.success(`订单创建成功，订单号:[${res.orderNo}]`).then(() => {
                _this.showCreateModal(false);
                const {currentPage, rows} = _this.state;
                _this.refreshOrders(currentPage, rows);
            });
        })
    }

    renderRowOperations(row) {
        const {id} = row;
        return (<>
            <Button type="link" onClick={() => this.props.history.push({pathname: `/c/market-order/${id}`})}>详情</Button>
        </>);
    }

    render() {
        const {createModalVisible, orders, currentPage, rows, totalRows} = this.state;
        return (
            <div className="market-orders">
                <div className="btns">
                    <Button icon={<PlusOutlined/>} type="primary"
                            onClick={() => this.showCreateModal(true)}>创建订单</Button>
                </div>
                <Table dataSource={orders}
                       pagination={{
                           showLessItems: false,
                           simple: false,
                           showQuickJumper: true,
                           pageSizeOptions: [10, 20, 50, 100],
                           showSizeChanger: true,
                           current: currentPage,
                           pageSize: rows,
                           total: totalRows,
                           onChange: (page, row) => this.refreshOrders(page, row)
                       }}>
                    <Table.Column title="#" dataIndex="id" width={50}/>
                    <Table.Column title="订单号" dataIndex="orderNo"/>
                    <Table.Column title="客户信息" dataIndex="customerName"/>
                    <Table.Column title="发货地址" dataIndex="deliveryAddress"/>
                    <Table.Column title="交货日期" dataIndex="exceedDate"/>
                    <Table.Column title="创建人" dataIndex="creator" render={u => u.name}/>
                    <Table.Column title="操作" render={row => this.renderRowOperations(row)}/>
                </Table>
                <Modal title="创建订单" visible={createModalVisible} okText="创建" cancelText="取消"
                       onOk={() => this.createForm && this.createForm.submit()}
                       maskClosable={false}
                       onCancel={() => this.showCreateModal(false)}>
                    <Form onFinish={data => this.createOrder(data)} ref={form => this.createForm = form}>
                        <Form.Item label="客户信息" name="customerName">
                            <TextArea/>
                        </Form.Item>
                        <Form.Item label="发货地址" name="deliveryAddress">
                            <TextArea/>
                        </Form.Item>
                        <Form.Item label="订单备注" name="remark">
                            <TextArea/>
                        </Form.Item>
                        <Form.Item label="交货日期" name="exceedDate" rules={[{required: true, message: '请选择交货日期'}]}>
                            <DatePicker placeholder="请选择交期"/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default mapStore(ConsoleMarketOrders);
