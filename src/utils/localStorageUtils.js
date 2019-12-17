export function loadState() {
    try {
        const serializedData = localStorage.getItem('jwt');

        if (serializedData === null) return undefined;

        return JSON.parse(serializedData);
    } catch (err) {
        return undefined;
    }
}

export function saveState(data) {
    try {
        const { jwt, exp } = data;
        const state = {
            jwt,
            exp
        };
        const serializedData = JSON.stringify(state);

        localStorage.setItem('jwt', serializedData);
    } catch (err) {
        console.error(err);
    }
}

export function getFromLocalStorage(key) {
    try {
        const data = loadState();

        return data ? data[key] : undefined;
    } catch (err) {
        return undefined;
    }
}
