import {SET_TOKEN} from './userActions';
import {storageSave} from './storage';
import {USER_TOKEN_STORAGE_KEY} from './storage';


const registerActionHandlers = reducer => {
    reducer.register(SET_TOKEN, (state, action) => {
        const {tokenStr} = action.token;
        storageSave(USER_TOKEN_STORAGE_KEY, tokenStr);
        return {
            ...state,
            token: action.token,
        };
    });
};

export default registerActionHandlers;
