export const calculateStockChanges = (initialStock, currentItem) => {
    console.log("initialStock", initialStock);
    console.log("currentItem", currentItem);
    // return currentStock.map((currentItem) => {
    console.log(initialStock, currentItem);
    const initialItem = initialStock.find(
        (item) => item.id === currentItem.id
    );

    if (initialItem) {
        // currentItem.currentQty = currentItem.currentQty || 0;

        if (currentItem.currentQty === initialItem.initialQty) {
            // currentItem.currentQty = initialItem.initialInstock;
            currentItem.currentInstock = initialItem.initialInstock;
        } else {
            const quantityChange =
                initialItem.initialQty - currentItem.currentQty;
            currentItem.currentInstock =
                initialItem.initialInstock + quantityChange;
        }
    }

    return Number(currentItem.currentInstock);
    // });
};

// Example usage
// const initialStock = [
//     { id: 1, initialQty: 5, initialInstock: 8 },
//     { id: 2, initialQty: 20, initialInstock: 20 },
//     { id: 3, initialQty: 15, initialInstock: 18 },
// ];

// const currentStock = { id: 3, currentQty: 6 };

// const updatedStock = calculateStockChanges(
//     initialStock,
//     currentStock
// );

// console.log(updatedStock);
export const calculateDamageBooksTotal = (damageBooks) => {
    if (damageBooks.length > 0) {
        const sum = damageBooks
            ?.map((item) => item.damage)
            .reduce((prev, next) => Number(prev) + Number(next));
        return Number(sum);
    } else {
        return 0;
    }
};
