

export type Drink = {
    image: string;
    name: string;
    price: number;
}

export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    priceSm: number;
    priceMd: number;
    priceLg: number;
    drinks: Drink[];
}

