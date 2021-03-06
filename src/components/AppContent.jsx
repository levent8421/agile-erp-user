import React, {Component} from 'react';
import rootRouters from '../router/rootRouter';
import {renderRoutes} from 'react-router-config';
import mapStore from '../store/storeAutoMapper';
import {fetchMe} from '../api/user';

class AppContent extends Component {
    componentDidMount() {
        const {tokenStr} = this.props.storeState.token;
        if (tokenStr) {
            this.fetchUser();
        }
    }

    fetchUser() {
        const {tokenStr} = this.props.storeState.token;
        const _this = this;
        fetchMe().then(res => {
            _this.props.actions.setToken(tokenStr, res);
        });
    }

    render() {
        return (
            <>
                {renderRoutes(rootRouters)}
            </>
        );
    }
}

export default mapStore(AppContent);
