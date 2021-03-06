import React, {Component} from 'react';
import {Layout} from "antd";
import './ContentFooter.less';

const {Footer} = Layout;

class ContentFooter extends Component {
    render() {
        return (
            <Footer className="footer">
                <p>Copyright &copy; monolithIoT.com 2021.03.03</p>
            </Footer>
        );
    }
}

export default ContentFooter;
