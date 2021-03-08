import data from './storeData';
import userReducer from './userReducer';
import consoleReducer from './consoleReducer';

class SimpleReducer {
    constructor() {
        this.handlerTable = {};
    }

    handle(state = data, action) {
        const {type} = action;
        if (!(type in this.handlerTable)) {
            // console.warn('Can not handle action', action);
            return state;
        }
        const handler = this.handlerTable[type];
        const res = handler(state, action);
        return {...res};
    }

    register(type, handler) {
        this.handlerTable[type] = handler;
        return this;
    }
}

const simpleReducer = new SimpleReducer();

userReducer(simpleReducer);
consoleReducer(simpleReducer);

const reducer = (state = data, action) => {
    return simpleReducer.handle(state, action);
};

export default reducer;
