import ILocation from "./location";

export default interface IUser {
    name:{
        title:string,
        first:string,
        last:string,
    },
    gender:string,
    location:ILocation,
    email:string,
    picture: {
        large:string,
        medium:string,
        thumbnail:string
    },
    login?: {
        uuid:string,
        username:string,
        password:string,
        salt:string,
        md5:string,
        sha1:string,
        sha256:string,
    },
    dob?: {
        date:string,
        age:number
    },
    registered?: {
        date:string,
        age:number
    },
    phone?: string,
    cell?:string,
    id: {
        name:string,
        value:string
    },
    nat?:string,
}
