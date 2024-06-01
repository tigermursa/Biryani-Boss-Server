

export type Drink = {
    image: string;
    name: string;
    price: number;
}

export type TProduct = {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    priceSm: number;
    priceMd: number;
    priceLg: number;
    isDeleted: boolean;
    drinks: Drink[];
}

