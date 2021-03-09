const storage = sessionStorage;

export function storageSave(key, value) {
    if (value) {
        return storage.setItem(key, value);
    } else {
        return storage.removeItem(key);
    }
}

export function storageGet(key) {
    return storage.getItem(key);
}

export const USER_TOKEN_STORAGE_KEY = 'XUToken';
