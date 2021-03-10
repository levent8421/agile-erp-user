const stateTable = {
    0x01: '创建',
    0x02: '完成',
};


export const asStateName = stateCode => {
    if (stateTable.hasOwnProperty(stateCode)) {
        return stateTable[stateCode];
    }
    return `位置状态${stateCode}`;
};
