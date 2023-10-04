import { formatMoney } from "./formatMoney";

export const calculateInvoiceQty = (item) => {
    const books = item?.sale_book?.books;
    const sum = books
        ?.map((item) => item.qty)
        .reduce((prev, next) => prev + next);
    return formatMoney(sum);
};

export const calculateInvoiceTotalAmount = (item) => {
    const books = item?.sale_book?.books;
    const sum = books
        ?.map((item) => item.total_amount)
        .reduce((prev, next) => prev + next);
    return sum;
};

export const calculateInvoiceTotalDiscount = (item) => {
    const books = item?.sale_book?.books;
    const sum = books
        ?.map((item) => item.discount)
        .reduce((prev, next) => prev + next);
    return sum;
};

export const calculateInvoiceTotalNetAmount = (item) => {
    const sum =
        item?.sale_book != null
            ? calculateInvoiceTotalAmount(item) +
              Number(item.delivery_charges)
            : item.delivery_charges;
    return sum;
};
export const dateFormat = (item) => {
    const inputDate = item;
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}-${
        month < 10 ? "0" + month : month
    }-${year}`;
    return formattedDate;
};
