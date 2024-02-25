import ILocation from "../types/location";
import IUser from "../types/user";


export default class User implements IUser{
    name: { title: string;first: string; last: string; };
    id: { name: string; value: string; };
    email: string;
    gender:string;
    location: ILocation;
    picture: { large: string; medium: string; thumbnail: string; };
    cell?: string | undefined;
    dob?: { date: string; age: number; } | undefined;
    login?: { uuid: string; username: string; password: string; salt: string; md5: string; sha1: string; sha256: string; } | undefined;
    nat?: string | undefined;
    phone?: string | undefined;
    registered?: { date: string; age: number; } | undefined;

    constructor(user: IUser, location: ILocation) {
        this.name = { 
            title: user.name.title,
            first: user.name.first, 
            last: user.name.last
        }
        this.gender = user.gender
        this.location = location
        this.cell = user.cell
        this.dob = user.dob
        this.email = user.email
        this.id = user.id
        this.login = user.login
        this.nat = user.nat
        this.phone = user.phone
        this.picture = user.picture
        this.registered = user.registered
    }
}