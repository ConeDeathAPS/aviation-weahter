import {Location} from "../../types/Locations";
import {ProductInfo} from "../../types/ProductInfo";

export default interface ProductDisplayProps {
    location: Location;
    product: ProductInfo;
}