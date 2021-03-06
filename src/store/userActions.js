export const SET_TOKEN = 'user.set_token';

export const setToken = (tokenStr, user) => {
    return {
        type: SET_TOKEN,
        token: {
            tokenStr: tokenStr,
            user: user,
        }
    };
};

export const operationsTable = {
    setToken
};
