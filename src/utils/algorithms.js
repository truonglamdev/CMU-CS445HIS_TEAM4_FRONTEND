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

export function  countFields (arr , field) {
    const departmentCounts = {};

    arr.forEach((employee) => {
        const department = employee[field];
        if (departmentCounts.hasOwnProperty(department)) {
            departmentCounts[department]++;
        } else {
            departmentCounts[department] = 1;
        }
    });

    const result = [];
    for (const department in departmentCounts) {
        result.push({ value: departmentCounts[department], label: department });
    }
    return result
}

