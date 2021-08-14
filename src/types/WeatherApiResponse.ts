export default interface WeatherApiResponse<DataType> {
    '@context': {
        '@version': string;
        '@vocab': string;
    };
    '@graph': DataType[];
}