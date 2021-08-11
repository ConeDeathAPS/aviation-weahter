import React from 'react';
import axios, {AxiosResponse} from 'axios';
import LocationDetailProps from "./LocationDetailProps";
import {ProductInfo, ProductInfoResponse} from "../../types/ProductInfo";
import {Location} from "../../types/Locations";

class LocationDetailState {
    location: Location;
    loadingAvailableProducts: boolean;
    availableProducts: ProductInfo[];
}

export default class LocationDetails extends React.Component<LocationDetailProps, LocationDetailState> {
    constructor(props: LocationDetailProps) {
        super(props);
        this.state = {
            location: this.props.location,
            loadingAvailableProducts: true,
            availableProducts: undefined,
        };
        this.fetchAvailableProducts = this.fetchAvailableProducts.bind(this);
    }

    componentDidMount() {
        this.fetchAvailableProducts();
    }

    onProductSelected(productCode: string): void {
        console.log('Selected product:', productCode);
    }

    fetchAvailableProducts() {
        axios.get(
            `https://api.weather.gov/products/locations/${this.props.location.locationId}/types`,
            {
                headers:{
                    'accept': 'application/ld+json',
                    'User-Agent': 'sorensenapaul@gmail.com'
                }
            }).then((response: AxiosResponse<ProductInfoResponse>) => {
                console.log('Available products response:', response);
                this.setState({ loadingAvailableProducts: false, availableProducts: response.data["@graph"]});
            }).catch((err) => {
                console.error(`Error getting products for location ID ${this.props.location.locationId}`);
                this.setState({ loadingAvailableProducts: false });
            })
    }

    render() {
        return (<section id={'location-detail'}>
            <h3>{this.props.location.locationName}</h3>
            { this.state.loadingAvailableProducts &&
                <p>Loading products...</p>
            }
            {!this.state.loadingAvailableProducts && this.state.availableProducts &&
                <ul>
                    {this.state.availableProducts.map((product: ProductInfo) =>
                        <button key={product.productCode} onClick={() => this.onProductSelected(product.productCode)}>{product.productName}</button>
                    )}
                </ul>
            }
        </section>);
    }
}