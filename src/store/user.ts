import {makeAutoObservable} from 'mobx'
import AppStore from './app';
import User from '../models/user';
import IUser from '../types/user';

export default class UserStore {
    constructor(private store: AppStore) {
        makeAutoObservable(this);
    }

    userList:IUser[] = []
    userSavedList:IUser[] = []
    currentUser:IUser | null = null

    fillUserListOnce(user: IUser){
        const isHaveUser = this.userList?.filter(u=> u.id.value === user.id.value)
        if(isHaveUser.length > 0){
            return false
        }
        this.userList?.push(user)
    }

    isUserSaved(user: IUser){
        const isSavedUser = this.userSavedList.filter(userSaved => userSaved.id.value === user.id.value)
        return isSavedUser.length > 0
    }

    fillUserSavedListFull(users: IUser[]){
        this.userSavedList = [] 
        users.forEach(user => this.userSavedList.push(new User(user, user.location)))
    }

    saveCurrentUser(user: IUser){
        this.currentUser = user
    }

    fillUserListMany(users: IUser[]){
        users.forEach(user => {
            const userHas = this.userList.filter(u => u.id.value === user.id.value)
            if(userHas.length < 1){
                this.userList.push(new User(user, user.location))
            }
        })
    }

    getSavedUserLocaly(){
        const storage =localStorage.getItem('savedUsers')
        if(!storage){
            localStorage.removeItem('savedUsers')
            return false
        }
        let savedUsersList:IUser[] = [...JSON.parse(storage)]
        if(savedUsersList.length < 1){
            localStorage.removeItem('savedUsers')
            return false
        }

        this.fillUserSavedListFull(savedUsersList)
        return true
    }

    removeUserListOnce(user: IUser){
        this.userList.splice(this.userList.indexOf(user), 1)
    }

    saveUserLocaly(user:IUser){
        const storage =localStorage.getItem('savedUsers')
        let savedUsersList:IUser[] = []
        if(storage){
            savedUsersList.push(...JSON.parse(storage))
        }
        const currentUser = savedUsersList.filter(userFromList => userFromList.id.value === user.id.value)
        if(currentUser.length > 0) {
            return true
        }
        savedUsersList.push(user)
        this.fillUserSavedListFull(savedUsersList)
        localStorage.setItem('savedUsers', JSON.stringify(savedUsersList))
        return true
    }

    deleteUserLocaly(user:IUser){
        const storage =localStorage.getItem('savedUsers')
        if(!storage){
            return true
        }
        let savedUsersList:IUser[] = [...JSON.parse(storage)]
        savedUsersList = savedUsersList.filter(userFromList => userFromList.id.value !== user.id.value)
        if (savedUsersList.length < 1 ){
            localStorage.removeItem('savedUsers')
        }
        this.fillUserSavedListFull(savedUsersList)
        localStorage.setItem('savedUsers', JSON.stringify(Array.from(savedUsersList)))
        return true
    }
}

