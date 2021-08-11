import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {Location, Locations} from "../../types/Locations";
import HomeProps from "./HomeProps";
import LocationDetails from "../LocationDetail/LocationDetail";

declare type HomeComponentState = { locations: Locations, loadingLocations: boolean, selectedLocation: Location };

export default class HomeComponent extends React.Component<HomeProps, HomeComponentState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            locations: undefined,
            loadingLocations: true,
            selectedLocation: undefined,
        };
        this.fetchLocations = this.fetchLocations.bind(this);
    }

    componentDidMount() {
        this.fetchLocations();
    }

    fetchLocations() {
        axios.get(
            'https://api.weather.gov/products/locations',
            {
                headers:{
                    'accept': 'application/ld+json',
                    'User-Agent': 'sorensenapaul@gmail.com'
                }
            }
        ).then((response: AxiosResponse<{ locations:  Locations }>) => {
            this.setState({ locations: response.data.locations, loadingLocations: false });
        })
        .catch((err) => {
            console.error('Unexpected error when fetching locations', err);
            this.setState({ loadingLocations: false });
        });
    }

    onLocationSelect(id: string, display: string): void {
        const location: Location = {
            locationId: id,
            locationName: display
        }
        this.setState({ selectedLocation: location });
    }
    render() {
        return (
            <section id={'home'}>
                <h1>Aviation Weather</h1>
                {this.state.loadingLocations &&
                <p>Loading locations...</p>
                }
                { !this.state.loadingLocations && this.state.locations != undefined &&
                <ul>
                    {this.state.locations && Array.from(Object.entries(this.state.locations)).map(entry => {
                        const [code, display] = entry;
                        if (display != null) return <li key={code} onClick={() => this.onLocationSelect(code, display)}>{code} -- {display}</li>
                    })}
                </ul>
                }
                {this.state.selectedLocation &&
                    <LocationDetails location={this.state.selectedLocation} />
                }
            </section>
        );
    }
}