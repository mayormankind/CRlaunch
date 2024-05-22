import React, { useState } from 'react';
import { Reveal } from './Reveal';
import Modal from './Modal';
import Loader from './Loader';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, store } from '../api/firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be 11 digits')
    .required('Phone number is required'),
  role: Yup.string().required('Role is required'),
  level: Yup.string().required('Skill level is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value.length > 0 && value[0].size <= 2000000; // 2MB
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && value.length > 0 && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
});

export default function Form({ setFormShow }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bioData, setBioData] = useState({});
  const [ uploadProgress, setUploadProgress ] = useState(0);

  const doSubmit = async (data) => {
    const storedEmail = localStorage.getItem('RegisteredEmail');
    if (storedEmail === data.email) {
      alert('You have already submitted a form with this email before.');
      return;
    }
    try {
      const imagesRef = ref(store, `Reeler/${uuid()}`);
      const uploadTask = uploadBytesResumable(imagesRef, data.image[0]);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress, if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log('Upload is ' + progress + '% done');
        },
        (err) => {
          console.log(err);
          alert('An error occurred while uploading the image.');
        },
        async () => {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          await setDoc(doc(db, "reelers-members", uuid()), {
            mid: uuid(),
            email: data.email,
            name: data.name,
            phoneNumber: data.phoneNumber,
            role: data.role,
            level: data.level,
            image: imageURL,
          });

          // Save email to localStorage
          localStorage.setItem('RegisteredEmail', data.email);
          setBioData(data);
          setModal(true);
          setSuccess(true);
          reset(); // Reset the form after successful submission
        }
      );
    } catch (err) {
      console.log(err);
      alert('An error occurred while uploading.');
    }
  };

  return (
    <div className='h-screen fixed top-0 bottom-0 left-0 right-0 bg-opacity-80 bg-black flex z-50 overflow-y-scroll'>
      <div className="w-full flex flex-col gap-5 p-10 max-w-4xl bg-opacity-40 m-auto bg-sky-500 items-center relative md:gap-10 md:flex-row">
        <button className="absolute text-red-700 p-1 font-bold text-lg top-2 right-5 hover:bg-black hover:text-red-400" onClick={() => setFormShow(false)}>X</button>
        <section className="flex p-5 flex-col gap-5 items-center text-white md:w-1/2">
          <Reveal><img src="/lgo.png" alt="" className="w-full" /></Reveal>
          <Reveal><p className='text-sm md:text-lg'>We are a team of tech enthusiasts driven towards achieving problem-solving goals and building improvement-friendly community!</p></Reveal>
        </section>
        <section className="flex flex-col w-full gap-5 md:w-1/2">
          <h2 className='text-center font-bold text-white text-xl'>Application form</h2>
          <Reveal>
            <form onSubmit={handleSubmit(doSubmit)} className="flex flex-col gap-3 md:gap-5">
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder='Your full name' className='p-2' {...register('name')} />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="email" placeholder='Your active email' className='p-2' {...register('email')} />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="tel" placeholder='Your phone number' className='p-2' {...register('phoneNumber')} />
                    {errors.phoneNumber && <p className='text-red-600'>{errors.phoneNumber.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <select className='p-2' {...register('role')}>
                        <option value=''>Select role</option>
                        <option value="Developer">Developer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Graphics Designer">Graphics Designer</option>
                        <option value="UI/UX designer">UI/UX Designer</option>
                        <option value="Writer">Tech Writer</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.role && <p className='text-red-600'>{errors.role.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <select className='p-2' {...register('level')}>
                        <option value=''>Skill level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    {errors.level && <p className='text-red-600'>{errors.level.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="image" className='text-white border-2 p-2 w-full bg-transparent hover:border-l-sky-100 rounded-lg text-sm cursor-pointer text-center'>
                        Select an image
                    </label>
                    <input type="file" id="image" {...register('image')} className='hidden' />
                    {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                </div>
                <button type='submit' className='bg-orange-400 text-white hover:border-2 p-2 w-1/5 hover:bg-transparent hover:border-l-sky-100 self-end rounded-lg text-sm'>Submit</button>
            </form>
          </Reveal>
        </section>
      </div>
      { uploadProgress == 0 || uploadProgress == 100 ? <></> : <Loader uploadProgress={uploadProgress}/> }
      {modal && <Modal setModal={setModal} setFormShow={setFormShow} name={bioData.name} success={success} />}
    </div>
  );
}
