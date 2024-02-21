export const calculateTotalPrice = (sourceArr: any) => {
    const tempArr = sourceArr?.map((item: { productInfo: { totalPrice: number } }) => {
        return item.productInfo.totalPrice
    })
    const totalPrice = tempArr.reduce((total: number, number: number) => total + number, 0);

    return totalPrice
}