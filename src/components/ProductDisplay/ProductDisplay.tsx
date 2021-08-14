import React, {ChangeEvent} from 'react';
import ProductDisplayProps from "./ProductDisplayProps";
import axios, {AxiosResponse} from "axios";
import {Product} from "../../types/Product";
import WeatherApiResponse from "../../types/WeatherApiResponse";

declare interface ProductDisplayState {
    loadingProductInstances: boolean;
    loadingProduct: boolean;
    productData: Product[];
    selectedProduct: Product;
}

export default class ProductDisplay extends React.Component<ProductDisplayProps, ProductDisplayState> {

    constructor(props: ProductDisplayProps) {
        super(props);
        this.state = {
            loadingProductInstances: true,
            loadingProduct: false,
            productData: undefined,
            selectedProduct: undefined,
        };
        this.fetchProductInstances = this.fetchProductInstances.bind(this);
        this.fetchProductById = this.fetchProductById.bind(this);
    }

    componentDidMount() {
        this.fetchProductInstances();
    }

    componentDidUpdate(prevProps: Readonly<ProductDisplayProps>): void {
        if (prevProps.product.productCode !== this.props.product.productCode) this.fetchProductInstances();
    }

    fetchProductInstances(): void {
        axios.get(
            `https://api.weather.gov/products/types/${this.props.product.productCode}/locations/${this.props.location.locationId}`,
            {
                headers:{
                    'accept': 'application/ld+json',
                    'User-Agent': 'sorensenapaul@gmail.com'
                }
            }).then((response: AxiosResponse<WeatherApiResponse<Product>>) => {
            console.log('Product instances response:', response);
            this.setState({ loadingProductInstances: false, productData: response.data["@graph"]});
        }).catch((err) => {
            console.error(`Error getting product instances for product code '${this.props.product.productCode}' and location ID ${this.props.location.locationId}`, err);
            this.setState({ loadingProductInstances: false });
        });
    }

    fetchProductById(id: string) {
        this.setState({ loadingProduct: true });
        axios.get(
            `https://api.weather.gov/products/${id}`,
            {
                headers:{
                    'accept': 'application/ld+json',
                    'User-Agent': 'sorensenapaul@gmail.com'
                }
            }).then((response: AxiosResponse<Product>) => {
            console.log('Single product response:', response);
            this.setState({ loadingProduct: false, selectedProduct: response.data});
        }).catch((err) => {
            console.error(`Error getting product id ${id}`, err);
            this.setState({ loadingProduct: false });
        });
    }

    onProductSelectionChange(e: ChangeEvent<HTMLSelectElement>): void {
        if (this.state.selectedProduct && this.state.selectedProduct.id === e.target.value) return;
        const selectedProduct = this.state.productData.find(product => product.id === e.target.value);
        this.setState({ selectedProduct });
        this.fetchProductById(selectedProduct.id);
    }

    render() {
        return (
            <section id={'product-display'}>
                {this.state.loadingProductInstances &&
                    <p className={'loader'}>Loading available instances...</p>
                }
                {!this.state.loadingProductInstances && this.state.productData && (
                    <select defaultValue={undefined} onChange={(e) => this.onProductSelectionChange(e)}>
                        <option value={undefined}>--NONE--</option>
                        {this.state.productData.map(product =>
                            <option key={product.id} value={product.id}>{product.issuanceTime}</option>
                        )}
                    </select>
                )}
                {this.state.selectedProduct &&
                    <pre>{this.state.selectedProduct.productText}</pre>
                }
            </section>
        );
    }
}