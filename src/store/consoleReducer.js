import {SET_TITLE} from './consoleAction';


const registerActionHandlers = reducer => {
    reducer.register(SET_TITLE, (state, action) => {
        return {
            ...state,
            title: action.title,
        };
    });
};

export default registerActionHandlers;
