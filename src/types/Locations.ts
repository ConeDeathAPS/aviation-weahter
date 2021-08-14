export declare type Locations = { [key: string]: string };

export class Location{
    locationId: string
    locationName: string
    constructor(id: string, name: string) {
        this.locationId = id;
        this.locationName = name;
    }
}