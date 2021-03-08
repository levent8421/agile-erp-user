export const SET_TITLE = 'console.set_title';

export const setTitle = (title, subTitle) => {
    return {
        type: SET_TITLE,
        title: {
            title,
            subTitle,
        }
    };
};

export const operationsTable = {
    setTitle
};
