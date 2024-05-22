import React from 'react'

export default function Loader({uploadProgress}) {

  return (
    <div className='h-screen fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-black flex z-50 overflow-y-scroll'>
        <div className='w-fit flex flex-col gap-4 m-auto text-center'>
            <p>Loading... Please wait!</p>
            <span className="text-orange-400">
                {uploadProgress}% done...
            </span>
        </div>
    </div>
  )
}
