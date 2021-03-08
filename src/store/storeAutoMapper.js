import {connect} from 'react-redux';
import {operationsTable as userOperationsTable} from './userActions';
import {operationsTable as consoleOperationsTable} from './consoleAction';

const mapStateForComponent = (state, props) => {
    return {
        ...props,
        storeState: state,
    };
};
const asDispatchedProps = (dispatch, table) => {
    const res = {};
    for (let k in table) {
        if (!table.hasOwnProperty(k)) {
            continue;
        }
        res[k] = (...args) => dispatch(table[k](...args));
    }
    return res;
};
const mapActionForComponent = (dispatch, props) => {
    return {
        ...props,
        actions: {
            ...asDispatchedProps(dispatch, userOperationsTable),
            ...asDispatchedProps(dispatch, consoleOperationsTable),
        },
    };
};
const mapper = component => {
    return connect(mapStateForComponent, mapActionForComponent)(component);
};

export default mapper;
