import React, {Component} from 'react';
import {Input, message, Modal, Table} from 'antd';
import PropTypes from 'prop-types';
import './PartSelectModal.less';
import {search} from '../../api/part';

const SEARCH_MAX = 100;

class PartSelectModal extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    state = {
        rows: [],
    };

    doSearch(text) {
        if (!text) {
            message.warn('请输入搜索内容');
            return;
        }
        const _this = this;
        search(text, SEARCH_MAX).then(res => {
            for (const row of res) {
                row.key = row.id;
            }
            _this.setState({rows: res});
        });
    }

    tableRowOperations(record) {
        const _this = this;
        return {
            onClick: () => {
                _this.props.onSelect(record);
            }
        };
    }

    render() {
        const {rows} = this.state;
        return (
            <Modal title="选择物料"
                   visible={this.props.visible}
                   okText="确定"
                   cancelText="取消"
                   className="part-select-modal"
                   width={1000}
                   maskClosable={false}
                   onCancel={() => this.props.onClose()}>
                <div className="table-operations">
                    <Input.Search enterButton="搜索" onSearch={text => this.doSearch(text)}/>
                </div>
                <Table dataSource={rows} pagination={false} onRow={record => this.tableRowOperations(record)}>
                    <Table.Column title="#" dataIndex="id"/>
                    <Table.Column title="物料号" dataIndex="partNo"/>
                    <Table.Column title="描述" dataIndex="description"/>
                    <Table.Column title="封装" dataIndex="packaging"/>
                    <Table.Column title="型号" dataIndex="model"/>
                    <Table.Column title="封装数量" dataIndex="packingQty"/>
                </Table>
            </Modal>
        );
    }
}

export default PartSelectModal;
