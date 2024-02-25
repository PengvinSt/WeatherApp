import React, { useEffect, useState } from 'react'
import { useAppContext } from '../utils/context'
import IUser from '../types/user'
import UserCard from '../components/userCard'
import { observer } from 'mobx-react'
import '../styles/MainPage.scss'
import button_logo from '../assets/images/black_plus.png';
import Modal from '../components/modal'
import { useNavigate } from 'react-router-dom'


function MainPage() {
  const { api, store } = useAppContext()
  const [userList, setUserList] = useState<IUser[]>([])
  const [loadingCard, setLoadingCard] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/allUsers');
  };

  const getOneUser = async () => {
    setLoadingCard(true)
    await api.user.getOneUser()
    setUserList(()=> [...store.user.userList]);
    setLoadingCard(false)
  }


const reloadUserList = () => {
  if(store.user.userList.length > 0){
    setUserList(()=> [...store.user.userList]);
  }
  setUserList(()=> []);
}
  useEffect(()=>{
    reloadUserList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
    <Modal isOpenModal={openModal} setOpenModal={()=> setOpenModal(false)}/>
    <div className='main_page_container'>
      <section className='cards_container'>
      {userList.length > 0 && userList.map((user,i)=> <UserCard user={user} key={i} reloadUserList={reloadUserList} setOpenModal={()=> setOpenModal(true)}/>)}
        <div className='user_card'>
          <div className='center_container'>
            {loadingCard ? (<>Loading...</>): (
            <>
              <button className='add_user_button' onClick={()=> getOneUser()}>
                <img src={button_logo} alt="add button img" />
                <span>Add user</span>
              </button> 
            </>)}
          </div>
        </div>  
        <div className='user_card'>
          <div className='center_container'>
            <button className='add_user_button' onClick={handleRedirect}>
                <span>Get saved users</span>
            </button> 
          </div>
        </div> 
      </section>
    </div>
    </>
    
  );
}

export default observer(MainPage);
