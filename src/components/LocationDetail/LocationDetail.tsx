import React, {SyntheticEvent, ChangeEvent} from 'react';
import axios, {AxiosResponse} from 'axios';
import LocationDetailProps from "./LocationDetailProps";
import {ProductInfo} from "../../types/ProductInfo";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import WeatherApiResponse from "../../types/WeatherApiResponse";

interface LocationDetailState {
    loadingAvailableProducts: boolean;
    availableProducts: ProductInfo[];
    selectedProduct: ProductInfo;
}

export default class LocationDetails extends React.Component<LocationDetailProps, LocationDetailState> {
    constructor(props: LocationDetailProps) {
        super(props);
        this.state = {
            loadingAvailableProducts: !!this.props.location,
            availableProducts: undefined,
            selectedProduct: undefined,
        };
        this.fetchAvailableProducts = this.fetchAvailableProducts.bind(this);
    }

    componentDidMount(): void {
        // Nothing here
    }

    componentDidUpdate(previousProps: LocationDetailProps): void {
        if (!this.props.location) return;
        if (!previousProps.location ||
            (previousProps.location.locationId !== this.props.location.locationId)
        ) this.fetchAvailableProducts();
    }

    onProductSelectionChanged(e: ChangeEvent<HTMLSelectElement>): void {
        if (this.state.selectedProduct && this.state.selectedProduct.productCode === e.target.value) return;
        const selectedProduct = this.state.availableProducts.find(product => product.productCode === e.target.value);
        this.setState({ selectedProduct });
    }

    fetchAvailableProducts(): void {
        this.setState({loadingAvailableProducts: true});
        axios.get(
            `https://api.weather.gov/products/locations/${this.props.location.locationId}/types`,
            {
                headers: {
                    'accept': 'application/ld+json',
                    'User-Agent': 'sorensenapaul@gmail.com'
                }
            }).then((response: AxiosResponse<WeatherApiResponse<ProductInfo>>) => {
            this.setState({loadingAvailableProducts: false, availableProducts: response.data["@graph"]});
        }).catch((err) => {
            console.error(`Error getting products for location ID ${this.props.location.locationId}`);
            this.setState({loadingAvailableProducts: false});
        });
    }

    render() {
        return (<section id={'location-detail'}>
            <h3>{this.props.location ? this.props.location.locationName : 'Pick a location'}</h3>
            {this.state.loadingAvailableProducts &&
            <p className={'loader'}>Loading products...</p>
            }
            {!this.state.loadingAvailableProducts && this.state.availableProducts &&
            <select onChange={(e: ChangeEvent<HTMLSelectElement>) => this.onProductSelectionChanged(e)} defaultValue={undefined}>
                <option key={'NONE'} value={undefined}>--NONE--</option>
                {this.state.availableProducts.map((product: ProductInfo) =>
                    <option key={product.productCode} value={product.productCode}>{product.productName}</option>
                )};
            </select>
            }
            {this.state.selectedProduct && this.props.location &&
                <ProductDisplay location={this.props.location} product={this.state.selectedProduct}/>
            }
        </section>);
    }
}