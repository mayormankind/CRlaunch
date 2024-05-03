import reactLogo from '../assets/react.svg'
import Logo from '/lgo.png';
import Rocket from '/rocket.svg';
import '../App.css'
import { useState } from 'react';
import Form from './Form';
import AboutPage from './AboutPage';
import { Reveal } from './Reveal';

export default function Landing() {

    const [ formShow, setFormShow ] = useState(false);
    const [ page, setPage ] = useState('Landing');

  return (
    <>
        {/* <main className="min-h-screen flex bg-gradient-to-br from-slate-900 to-sky-700 p-10"> */}
        {page=== 'Landing' && <main className="min-h-screen flex bg-gradient-to-br from-sky-700 from-5% via-gray-900 via-50% to-black to-95% p-5 md:p-10">
            <div className="flex flex-col w-full max-w-5xl mx-auto relative gap-5">
                <section className=''>
                    <img src={Logo} alt="" className='w-1/3 md:w-40' />
                </section>
                <section className='m-auto w-full flex flex-col-reverse gap-10 justify-between items-center text-white md:flex-row md:gap-1'>
                    <div className="flex flex-col gap-5 w-full md:gap-10 md:w-1/2">
                        <div className="flex flex-col gap-3">
                            <Reveal>
                                <h2 className="text-white text-3xl font-bold md:text-5xl">It's our <span className={'text-orange-400'}>launching</span> today!</h2>
                            </Reveal>
                            <Reveal><p className="text-orange-400 text-sm text-left md:font-semibold">Be a part of something new.</p></Reveal>
                        </div>
                        <div className="flex space-x-5 items-center">
                            <Reveal>
                                <button className='min-w-20 font-semibold p-3 border-2 border-l-sky-100 rounded-lg hover:border-orange-400 text-xs md:w-1/5' onClick={()=>setPage('About')}>About us</button>
                            </Reveal>
                            <Reveal>
                                <button className='min-w-20 p-3 text-xs font-semibold bg-orange-400 rounded-lg md:w-1/5' onClick={()=>setFormShow(true)}>Join us</button>
                            </Reveal>
                        </div>
                    </div>
                    <div className="w-full flex justify-center md:justify-end md:w-1/2">
                        <img src={Rocket} alt="" />
                    </div>
                </section>
            </div>
        </main>}
        {formShow && <Form setFormShow={setFormShow}/>}
        {page === 'About' && <AboutPage setPage={setPage}/>}
    </>
  )
}