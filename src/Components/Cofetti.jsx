import React from 'react'
import ReactConfetti from 'react-confetti'

export default function Cofetti() {

    // const { width, height } = useWindowSize
    const width = window.innerWidth;
    const height = window.innerHeight;

  return (
    <ReactConfetti width={width} height={height}/>
  )
}
