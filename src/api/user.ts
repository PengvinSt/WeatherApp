import AppStore from "../store/app";
import AppApi from "./app";


export default class UserApi {
    constructor(private api: AppApi, private store: AppStore) {}

    async getOneUser(){
        try {
            const {data} = await this.api.userConnection.get('/api')
            const oneUser = data.results[0]
            this.store.user.fillUserListOnce(oneUser)
        } catch (error) {
            console.error(error)
        }
    }
}