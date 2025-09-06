// Parse dot/bracket notation path: "addresses[0].city" => ["addresses", "0", "city"]
export function parsePath(path) {
    return path.replace(/\[(\d+)]/g, '.$1').split('.');
}

// Get nested value from object by path
export function getIn(obj, path) {
    const keys = parsePath(path);
    return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

// Set nested value on object by path
export function setIn(obj, path, value) {
    const keys = parsePath(path);
    const lastKey = keys.pop();

    const newObj = { ...obj };
    let nested = newObj;

    keys.forEach((key) => {
        if (nested[key] === undefined) {
            nested[key] = isNaN(+key) ? {} : [];
        }
        nested[key] = Array.isArray(nested[key]) ? [...nested[key]] : { ...nested[key] };
        nested = nested[key];
    });

    nested[lastKey] = value;
    return newObj;
}

// Add item to an array field
export function addItem(obj, path, item) {
    const arr = getIn(obj, path) || [];
    const updatedArr = [...arr, item];
    return setIn(obj, path, updatedArr);
}

// Remove item by index from an array field
export function removeItem(obj, path, index) {
    const arr = getIn(obj, path) || [];
    const updatedArr = arr.filter((_, i) => i !== index);
    return setIn(obj, path, updatedArr);
}