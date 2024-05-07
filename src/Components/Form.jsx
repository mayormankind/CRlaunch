import React, { useState } from 'react';
import { Reveal } from './Reveal';
import Modal from './Modal';
import { v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, store } from '../api/firebase';

export default function Form({ setFormShow }) {
    const [ bioData, setBioData ] = useState({});
    const [ error, setError ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ count, setCount ] = useState(0);

    const validate = ()=>{
        let errors = {}
        if(!bioData.email) errors.email = 'Email field is required'
        if(!bioData.email.includes('@') || !bioData.email.includes('.com')) errors.email = 'The email you entered is invalid'
        if(!bioData.name) errors.name = 'Name field is required'
        if(!bioData.phone) errors.phone = 'Phone Number field is required'
        if(bioData.phone.length !== 11) errors.phone = 'The phone number you entered is invalid'
        if(!bioData.role) errors.role= 'Role field is required'
        if(!bioData.level) errors.level= 'Level field is required'
        if(!bioData.image) errors.image= 'Image field is required'
        
        setError(errors)
        return Object.keys(errors).length === 0;
      }
      
      const handleSubmit = async(e) => {
        e.preventDefault();
        if(validate()){
            try{
                const imagesRef = ref(store,`Reeler/${uuid()}`);
                const uploadTask = uploadBytesResumable(imagesRef,bioData.image)
                uploadTask.on(
                  (err) => {
                      console.log(err);
                  },
                  ()=>{
                      getDownloadURL(uploadTask.snapshot.ref).then(async(imageURL)=>{
                          await setDoc(doc(db, "reelers-members", uuid()), {
                            mid:uuid(),
                            email: bioData.email,
                            name: bioData.name,
                            phone: bioData.phone,
                            role: bioData.role,
                            level: bioData.level,
                            image: imageURL});
                          });
                      })
                    setModal(true);
            }catch(err){
                console.log(err);
                alert('an error occured while uploading');
            }
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
                    <form action="" className="flex flex-col gap-3 md:gap-5">
                        <input type="text" name="name" id="" placeholder='Your full name' className='p-2' onChange={(e)=>setBioData({...bioData,name:e.target.value})} value={bioData ? bioData.name : ''}/>
                        {error.name ? <p className='text-red-600'>{error.name}</p> : null}
                        <input type="email" name="email" id="" placeholder='Your active email' className='p-2' onChange={(e)=>setBioData({...bioData,email:e.target.value})} value={bioData ? bioData.email : ''}/>
                        {error.email ? <p className='text-red-600'>{error.email}</p> : null}
                        <input type="tel" name="" id="" placeholder='Your phone number' className='p-2' onChange={(e)=>setBioData({...bioData,phone:e.target.value})} value={bioData ? bioData.phone : ''}/>
                        {error.phone ? <p className='text-red-600'>{error.phone}</p> : null}
                        <select name="" id="" className='p-2' onChange={(e)=>setBioData({...bioData,role:e.target.value})} value={bioData ? bioData.role : ''}>
                            <option>Select role</option>
                            <option value="Developer">Developer</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Graphics Designer">Graphics Design</option>
                            <option value="UI/UX designer">UI/UX design</option>
                            <option value="Writer">Tech writer</option>
                            <option value="others">Others</option>
                        </select>
                        {error.role ? <p className='text-red-600'>{error.role}</p> : null}
                        <select name="" id="" className='p-2' onChange={(e)=>setBioData({...bioData,level:e.target.value})} value={bioData ? bioData.level : ''}>
                            <option>Skill level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">God mode</option>
                        </select>
                        {error.level ? <p className='text-red-600'>{error.level}</p> : null}
                        <label htmlFor="image" className='text-white border-2 p-2 w-full bg-transparent hover:border-l-sky-100 rounded-lg text-sm cursor-pointer text-center'>Select an image
                        </label>
                        <input type="file" name="" id="image" onChange={(e)=>setBioData({...bioData,image:e.target.files[0]})} className='hidden'/>
                        {error.image ? <p className='text-red-600'>{error.image}</p> : null}
                        <button onClick={handleSubmit} className='bg-orange-400 text-white hover:border-2 p-2 w-1/5 hover:bg-transparent hover:border-l-sky-100 self-end rounded-lg text-sm'>Submit</button>
                    </form>
                </Reveal>
            </section>
        </div>
        {modal && <Modal setModal={setModal} setFormShow={setFormShow} name={bioData.name} setBioData={setBioData}/>}
    </div>
  )
}
