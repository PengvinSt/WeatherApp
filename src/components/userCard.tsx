import React, { useEffect, useState } from 'react'
import IUser from '../types/user'
import { useAppContext } from '../utils/context'
import '../styles/userCard.scss'
import { observer } from 'mobx-react'

interface UserCardProps {
    user: IUser,
    reloadUserList: ()=>void,
    setOpenModal:() => void
  }

function UserCard({user, reloadUserList, setOpenModal}:UserCardProps) {

  const [ buttonType, setButtonType ] = useState(false)

  const { api, store } = useAppContext()
  const getCurrentLocalWeather = async (user:IUser) => {
    await api.weather.getCurrentWeather(user)
    setOpenModal()
  }

  const saveUserLocaly = (user:IUser) => {
    store.user.saveUserLocaly(user)
    isUserSaved(user) ? setButtonType(true) : setButtonType(false) 
  }
  const deleteUserLocaly = (user:IUser) => {
    store.user.deleteUserLocaly(user)
    isUserSaved(user) ? setButtonType(true) : setButtonType(false) 
  }
  const deleteUser = (user:IUser) => {
    store.user.removeUserListOnce(user)
    reloadUserList()
  }
  const isUserSaved = (user:IUser) => {
    return store.user.isUserSaved(user)
  }
  useEffect(()=> {
    store.user.saveCurrentUser(user)
    isUserSaved(user) ? setButtonType(true) : setButtonType(false) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='user_card'>
        <img className='profile_image' src={user.picture.medium} alt="user profile" />
        <p>{user.name.title} {user.name.first} {user.name.last}</p>
        <p>Gender: {user.gender}</p>
        <p>City: {user.location.city}</p>
        <p>Country: {user.location.country}</p>
        <p>State: {user.location.state}</p>
        <p>Street: {user.location.street?.number}</p>
        <button className='user_card_button' onClick={()=> getCurrentLocalWeather(user)}>Get Weather</button>
        {buttonType
        ? <button className='user_card_button' onClick={()=> deleteUserLocaly(user)}>Delete user localy</button>
        : <>
           <button className='user_card_button' onClick={()=> saveUserLocaly(user)}>Save user localy</button>
           <button className='user_card_button' onClick={()=> deleteUser(user)}>Delete user</button> 
          </>
        }
    </div>
  )
}

export default observer(UserCard)