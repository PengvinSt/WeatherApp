export default interface ILocation {
    street?: {
        number: number,
        name: string,
    },
    city?: string,
    state?: string,
    country?: string,
    postcode?: string,
    coordinates: {
        latitude: number,
        longitude: number,
    },
    timezone?:{
        offset:string,
        description:string,
    }
}