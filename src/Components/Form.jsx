import React from 'react';

export default function Form({ setFormShow }) {


  return (
    <div className='h-screen fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-black flex z-50'>
        <div className="w-full flex flex-col gap-5 p-10 max-w-4xl bg-opacity-40 m-auto bg-sky-500 items-center relative overflow-y-scroll md:gap-10 md:flex-row">
            <button className="absolute text-red-700 p-1 font-bold text-lg top-2 right-5 hover:bg-black hover:text-red-400" onClick={()=>setFormShow(false)}>X</button>
            <section className="flex p-5 flex-col gap-5 items-center text-white md:w-1/2">
                    <img src="/lgo.png" alt="" className="w-full" />
                    <p className='text-sm md:text-lg'>We are a team of tech ethusiasts driven towards achieving problem-solving goals and building improvement-friendly community! </p>
            </section>
            <section className="flex flex-col w-full gap-5 md:w-1/2">
                <h2 className='text-center font-bold text-white text-xl'>Application form</h2>
                <form action="" className="flex flex-col gap-3 md:gap-5">
                    <input type="text" name="name" id="" placeholder='Your full name' className='p-2'/>
                    <input type="email" name="email" id="" placeholder='Your active email' className='p-2'/>
                    <input type="tel" name="" id="" placeholder='Your phone number' className='p-2'/>
                    <select name="" id="" className='p-2'>
                        <option>Select role</option>
                        <option value="Developer">Developer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Data Science">Data Science"</option>
                        <option value="Graohics Design">Graohics Design</option>
                        <option value="UI/UX design">UI/UX design</option>
                        <option value="Writer">Writer</option>
                    </select>
                    <select name="" id="" className='p-2'>
                        <option>Skill level</option>
                        <option value="Select role">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Data Analyst">God mode</option>
                    </select>
                    <button className='bg-orange-400 text-white hover:border-2 p-2 w-1/5 hover:bg-transparent hover:border-l-sky-100 self-end rounded-lg text-sm'>Submit</button>
                </form>
            </section>
        </div>
    </div>
  )
}
