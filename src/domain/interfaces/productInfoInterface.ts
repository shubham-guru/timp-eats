export interface productInfoInterface {
    id: number,
    name: string,
    ingredients: string,
    healthBenefits: Array<string>,
    usage: Array<string>,
    isHandMade: boolean,
    price: Array<number>,
    img: string,
    units: number,
    totalPrice: number,
    quantity: number,
    qtyLabel: string
}