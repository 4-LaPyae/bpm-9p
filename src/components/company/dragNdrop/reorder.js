export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    console.log(list[startIndex], list[endIndex], startIndex, endIndex);
    result.splice(endIndex, 0, removed);

    return result;
};
