export interface CensusGeocodeResponse {
  result: {
    addressMatches: CensusGeocodeAddressMatch[];
    addressComponents: CensusGeocodeAddressComponent[];
  };
}

export interface CensusGeocodeAddressMatch {
  matchedAddress: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface CensusGeocodeAddressComponent {
  fromAddress: string;
  toAddress: string;
  preQualifier: string;
  preDirection: string;
  preType: string;
  streetName: string;
  suffixType: string;
  suffixDirection: string;
  suffixQualifier: string;
  city: string;
  state: string;
  zip: string;
}

export const getGeocode = async (address: string) => {
  return await fetch(
    `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=2020&format=json`
  );
};
