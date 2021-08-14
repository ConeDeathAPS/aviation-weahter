import React, {ChangeEvent} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Location, Locations} from "../../types/Locations";
import HomeProps from "./HomeProps";
import LocationDetails from "../LocationDetail/LocationDetail";

interface HomeComponentState {
    locations: Location[];
    filteredLocations: Location[];
    loadingLocations: boolean;
    selectedLocation: Location
}

export default class HomeComponent extends React.Component<HomeProps, HomeComponentState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            locations: undefined,
            filteredLocations: undefined,
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
            const locationsArray: Location[] = Object.entries(response.data.locations) // Extract entries
                .filter(entry => entry[1] !== null) // Remove nulls
                .map(entry => new Location(entry[0], entry[1])); // Convert to Location instances
            this.setState({ locations: locationsArray, filteredLocations: locationsArray, loadingLocations: false });
        })
        .catch((err) => {
            console.error('Unexpected error when fetching locations', err);
            this.setState({ loadingLocations: false });
        });
    }

    onLocationSelect(location: Location): void {
        this.setState({ selectedLocation: location });
    }

    onListFilterChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            filteredLocations: this.state.locations.filter(location => location.locationName.match(e.target.value))
        });
    }

    render() {
        return (
            <section id={'home'}>
                <h1>Aviation Weather</h1>
                {this.state.loadingLocations &&
                    <p className={'loader'}>Loading locations...</p>
                }
                { !this.state.loadingLocations && this.state.locations != undefined &&
                    <div id={'location-list'}>
                        <input placeholder={'Filter locations by name...'} type={'text'} onChange={(e) => this.onListFilterChange(e)} />
                        <ul>
                            {this.state.filteredLocations && this.state.filteredLocations.map(location =>
                                <li key={location.locationId} onClick={() => this.onLocationSelect(location)}>
                                        {location.locationId} -- {location.locationName}
                                </li>
                            )}
                        </ul>
                    </div>

                }
                <LocationDetails location={this.state.selectedLocation} />
            </section>
        );
    }
}