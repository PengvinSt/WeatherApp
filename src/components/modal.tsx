import { observer } from 'mobx-react'
import React from 'react'
import '../styles/Modal.scss'
import WeatherPage from './weatherInfo'
interface modalComponent {
    isOpenModal:boolean,
    setOpenModal:() => void
}

 function Modal({isOpenModal=false,setOpenModal}:modalComponent) {

    const setScroll = (isModal:boolean) => {
        if (isModal) {
            document.body.style.overflow = "hidden"
        }else {
            document.body.style.overflow = 'visible';
            document.body.style.overflowX = 'hidden';
        }
    }

    if(isOpenModal){
        setScroll(isOpenModal)
        return (
            <>
            <div className='modal_container'>
            <div className='modal_background' onClick={setOpenModal}></div>
                <div className='modal_body'>
                    <WeatherPage />
                </div>
            </div>
            </>
          )
    }else {
        setScroll(isOpenModal)
        return null
    }
}

export default observer(Modal)
