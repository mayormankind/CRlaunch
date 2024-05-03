import React, { useState } from 'react';
import { Reveal } from './Reveal';
import Modal from './Modal';

export default function Form({ setFormShow }) {
    const [ bioData, setBioData ] = useState({});
    const [ error, setError ] = useState({});
    const [ modal, setModal ] = useState(false);

    const validate = ()=>{
        let errors = {}
        if(!bioData.email) errors.email = 'Email field is required'
        if(!bioData.name) errors.name = 'Name field is required'
        if(!bioData.phone) errors.phone = 'Phone Number field is required'
        if(!bioData.role) errors.role= 'Role field is required'
        if(!bioData.level) errors.level= 'Level field is required'
        
        setError(errors)
        return Object.keys(errors).length === 0;
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            console.log(bioData);
            setBioData({})
            setModal(true);
        }
      };


  return (
    <div className='h-screen fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-black flex z-50 overflow-y-scroll'>
        <div className="w-full flex flex-col gap-5 p-10 max-w-4xl bg-opacity-40 m-auto bg-sky-500 items-center relative md:gap-10 md:flex-row">
            <button className="absolute text-red-700 p-1 font-bold text-lg top-2 right-5 hover:bg-black hover:text-red-400" onClick={()=>setFormShow(false)}>X</button>
            <section className="flex p-5 flex-col gap-5 items-center text-white md:w-1/2">
                <Reveal><img src="/lgo.png" alt="" className="w-full" /></Reveal>
                <Reveal><p className='text-sm md:text-lg'>We are a team of tech ethusiasts driven towards achieving problem-solving goals and building improvement-friendly community! </p></Reveal>
            </section>
            <section className="flex flex-col w-full gap-5 md:w-1/2">
                <h2 className='text-center font-bold text-white text-xl'>Application form</h2>
                <Reveal>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">
                        <input type="text" name="name" id="" placeholder='Your full name' className='p-2' onChange={(e)=>setBioData({...bioData,name:e.target.value})} value={bioData ? bioData.name : ''}/>
                        {error.name ? <p className='text-red-500'>{error.name}</p> : null}
                        <input type="email" name="email" id="" placeholder='Your active email' className='p-2' onChange={(e)=>setBioData({...bioData,email:e.target.value})} value={bioData ? bioData.email : ''}/>
                        {error.email ? <p className='text-red-500'>{error.email}</p> : null}
                        <input type="tel" name="" id="" placeholder='Your phone number' className='p-2' onChange={(e)=>setBioData({...bioData,phone:e.target.value})} value={bioData ? bioData.phone : ''}/>
                        {error.phone ? <p className='text-red-500'>{error.phone}</p> : null}
                        <select name="" id="" className='p-2' onChange={(e)=>setBioData({...bioData,role:e.target.value})} value={bioData ? bioData.role : ''}>
                            <option>Select role</option>
                            <option value="Developer">Developer</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Data Science">Data Scientist</option>
                            <option value="Graohics Design">Graphics Design</option>
                            <option value="UI/UX design">UI/UX design</option>
                            <option value="Writer">Tech writer</option>
                            <option value="others">Others</option>
                        </select>
                        {error.role ? <p className='text-red-500'>{error.role}</p> : null}
                        <select name="" id="" className='p-2' onChange={(e)=>setBioData({...bioData,level:e.target.value})} value={bioData ? bioData.level : ''}>
                            <option>Skill level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">God mode</option>
                        </select>
                        {error.level ? <p className='text-red-500'>{error.level}</p> : null}
                        <button type='submit' className='bg-orange-400 text-white hover:border-2 p-2 w-1/5 hover:bg-transparent hover:border-l-sky-100 self-end rounded-lg text-sm'>Submit</button>
                    </form>
                </Reveal>
            </section>
        </div>
        {modal && <Modal setModal={setModal} setFormShow={setFormShow}/>}
    </div>
  )
}
