import React from 'react'
import { Reveal } from './Reveal'

export default function AboutPage({ setPage }) {
  return (
    <div className="min-h-screen p-2 flex bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 md:p-10" id="about">
      <div className="max-w-5xl flex flex-col gap-5 mx-auto md:gap-10">
        <div className="flex relative">
          <span className="absolute top-2 left-0 hover:border-b-2 hover:border-orange-400 cursor-pointer font-bold text-xs text-white md:text-sm md:left-2" onClick={()=>setPage('Landing')}>Back to home</span>
          <h2 className="font-bold text-2xl text-white mx-auto md:text-4xl">About us</h2>
        </div>
        <div className="bg-white flex flex-col gap-10 rounded-lg text-black text-justify p-5 md:p-10">
          <section className='flex flex-col gap-5'>
            <h2 className='border-b-2 border-orange-400 mx-auto w-fit font-bold'>About Code Reelers</h2>
            <Reveal>
              <p>Code Reelers is a tech-driven team consisting of individuals who are tech enthusiasts, having an urge to learn and those who wants to explore tech as it is. It’s view of team is not solely based but community wise-driven to develop enthusiasts and build a place where thoughts of tech can be raised and innovated upon.</p>
            </Reveal>
          </section>
          <section className='flex flex-col gap-5'>
            <h2 className='border-b-2 border-orange-400 text-center mx-auto w-fit font-bold'>Our Goals</h2>
            <ul>
              <Reveal><li>🎈<p>To build a community wise-driven avenue for techies</p></li></Reveal>
              <Reveal><li>🎈<p>To create problem-solving solutions through thoughtful projects</p></li></Reveal>
              <Reveal><li>🎈<p>To host trainings and tech talks for interested aspirants.</p></li></Reveal>
              <Reveal><li>🎈<p>To participate in challenges that builds up our growth.</p></li></Reveal>
              <Reveal><li>🎈<p>To expand into a stranger community of techies.</p></li></Reveal>
            </ul>
          </section>
          <section className='flex flex-col gap-5'>
            <h2 className='border-b-2 border-orange-400 mx-auto w-fit font-bold'>Our Motto</h2>
            <q className='mx-auto'>Reeling in tech innovation, one step at a time</q>
          </section>
          <section className='flex flex-col gap-5'>
            <h2 className='border-b-2 border-orange-400 mx-auto w-fit font-bold'>Our Logo</h2>
            <Reveal><img src="lgo.png" alt="Code Reelers logo" className='w-full mx-auto md:w-1/2'/></Reveal>            
          </section>
          <span className="text-orange-900 font-semibold text-center cursor-pointer text-xs md:text-sm"><a href="#about" className={'hover:text-black hover:border-b-2 hover:border-orange-400'}>Go back to top</a></span>
        </div>
      </div>
    </div>
  )
}
