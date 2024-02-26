import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../utils/context';
import IUser from '../types/user';
import UserCard from '../components/userCard';
import Modal from '../components/modal';
import '../styles/SavedPage.scss'
import { useNavigate } from 'react-router-dom';


function SavedPage() {

  const { store } = useAppContext()
  const [userSavedListLoaded, setUserSavedListLoaded] = useState<IUser[]>([])
  const [loadingAll, setLoadingAll] = useState(true);
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };


    const loadStartData = async () => {
        setLoadingAll(true)
        const isHaveLocal = store.user.getSavedUserLocaly()
        if(isHaveLocal){
          setUserSavedListLoaded([...store.user.userSavedList]);
        }
   
        setLoadingAll(false)
    }
    
    
    const reloadSavedUserList = () => {
      setUserSavedListLoaded(()=> []);
      if(store.user.userSavedList.length > 0){
        setUserSavedListLoaded(()=> [...store.user.userSavedList]);
      }
    }

    useEffect(()=>{
        loadStartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div className='user_page_container'>
      <Modal isOpenModal={openModal} setOpenModal={()=> setOpenModal(false)}/>
      <section className='cards_container'>
      {loadingAll ? (<div className='user_card'>
            <div className='center_container'>
              <p>Loading ...</p>
            </div>
          </div> ): (<>
        {
            userSavedListLoaded.length > 0 
            ? userSavedListLoaded.map((user,i)=> 
                  <UserCard user={user} key={i} reloadSavedUserList={reloadSavedUserList} setOpenModal={()=> setOpenModal(true)}/>
                )
            : <div className='user_card'>
            <div className='center_container'>
              <p>Nothing here ...</p>
            </div>
          </div> 
        }
      </>)}
      <div className='user_card'>
          <div className='center_container'>
            <button className='go_user_button' onClick={handleRedirect}>
                <span>Get new users</span>
            </button> 
          </div>
        </div> 
      </section>
    </div>
  )
}

export default observer(SavedPage)