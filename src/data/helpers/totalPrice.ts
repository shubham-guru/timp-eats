export const calculateTotalPrice = (sourceArr: any) => {
    const tempArr = sourceArr?.map((item: { productInfo: { totalPrice: number } }) => {
        return item.productInfo.totalPrice
    })
    const Price = tempArr.reduce((total: number, number: number) => total + number, 0);
const totalPrice = Number(Price.toFixed(2));

    return totalPrice
}