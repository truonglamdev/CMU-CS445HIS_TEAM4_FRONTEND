export function uniqueValuesByKey(array, key) {
    let uniqueValues = [];
    let seenValues = new Set();

    array.forEach((item) => {
        let value = item[key];
        if (!seenValues.has(value)) {
            uniqueValues.push(value);
            seenValues.add(value);
        }
    });

    return uniqueValues;
}
