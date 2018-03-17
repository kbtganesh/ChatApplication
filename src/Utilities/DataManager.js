const key = {
    USER_ID: 'USER_ID',
}

const setData = (key, data) => {
    let text = data;
    if (text === null)
        text = '';
    else if (typeof data === 'object')
        text = JSON.stringify(data);
    localStorage.setItem(key, text)
}
const getData = (key) => {
    let json = {};
    try {
        let text = localStorage.getItem(key);
        if(typeof(text) === 'string')
        return text;
        else
        json = !!text ? JSON.parse(text) : {};
    } catch (e) { }
    return json;
}

export const DataManager = {
    clearAll: () => localStorage.clear(),

    get UserID() { return getData(key.USER_ID) },
    set UserID(id) { setData(key.USER_ID, id) },

}


