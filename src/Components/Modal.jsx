import React from 'react'
import { Reveal } from './Reveal';
import Cofetti from './Cofetti';
import successSound from '/song.mp3';

export default function Modal({ setModal, setFormShow, name, setBioData, success }) {

    const handleCancel = () =>{
        setModal(false);
        setFormShow(false);
        setBioData({})
    }

  return (
    <div className='h-screen fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-black flex z-50 overflow-y-scroll'>
        <Cofetti/>
        <audio autoPlay={success ? true : false} className='hidden'>
            <source src={successSound} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <div className='w-full m-auto max-w-md'>
            <Reveal>
                <div className=" relative flex flex-col p-5 bg-white z-10 gap-5 rounded-lg">
                    <button className="absolute text-red-700 p-1 font-bold text-lg top-2 right-5 hover:bg-black hover:text-red-400" onClick={handleCancel}>X</button>
                    <h1 className='font-bold'>Congratulations {name}! 🎉✨🎉🎊</h1>
                    <p>🎈Hurray congratulations for being a part of this great team. An email with an attachment of your offer letter would be sent to the mail provided by you.</p>
                    <p>😉Know that you are important! 😎🚀</p>
                </div>
            </Reveal>

        </div>
    </div>
  )
}
