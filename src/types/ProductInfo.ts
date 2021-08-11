export class ProductInfo {
    productCode: string;
    productName: string;
}

export declare type ProductInfoResponse = { '@graph': ProductInfo[] };