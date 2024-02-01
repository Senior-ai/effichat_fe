import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from "../../utils/validation";
import AuthInput from './common/AuthInput';
import GoogleButton from './common/GoogleButton';
import GithubButton from './common/GithubButton';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom'
import { registerUser, changeStatus } from '../../features/userSlice';
import axios from 'axios';
import Picture from './Picture';

const cloudSecret = process.env.REACT_APP_CLOUD_SECRET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);
    const [picture, setPicture] = useState();
    const [readablePicture, setReadablePicture] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        let res;
        dispatch(changeStatus('loading'))
        if (picture) {
            //upload to cloudinary and then register user
            await uploadImage().then(async (cloudRes) => {
                res = await dispatch(registerUser({ ...data, picture: cloudRes.secure_url }));
            });
        } else {
            const variant = ["marble", "beam", "ring", "bauhaus"][Math.floor(Math.random() * 4)];
            const picName = data.name.replace(/ /g, "%20");
            const imgUrl = `https://source.boringavatars.com/${variant}/120/${picName}?colors=ff6d00,ff7900,ff8500,ff9e00,3c096c,7b2cbf,9d4edd,e500a4`
            res = await dispatch(registerUser({ ...data, picture: imgUrl }));
        }
        console.log(res);
        if (res?.payload?.user) {
            navigate('/')
        }
    };

    const uploadImage = async () => {
        let formData = new FormData();
        formData.append('upload_preset', cloudSecret);
        formData.append('file', picture);
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        console.log(data);
        return data;
    }

    return (
        <div className="mt-6 flex flex-col items-center">
            {/* Heading */}
            <h2 className="text-xl xl:text-xl font-extrabold">
                Sign up
            </h2>
            {/* Container */}
            <div className="w-full flex-1 mt-4">
                {/* 3rd party Buttons */}
                <div className="flex flex-col items-center justify-between space-y-3">
                    <GoogleButton text='Sign Up with Google' />
                    <GithubButton text='Sign Up with GitHub' />
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-2 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>
                    <div className="mx-auto max-w-xs">
                        <AuthInput
                            name="name" type="text" placeholder="Name"
                            register={register} error={errors?.name?.message}
                        />
                        <AuthInput
                            name="email" type="text" placeholder="Email address"
                            register={register} error={errors?.email?.message}
                        />
                        <AuthInput
                            name="password" type="password" placeholder="Password"
                            register={register} error={errors?.password?.message}
                        />
                        <AuthInput
                            name="Status" type="text" placeholder="Status (Optional)"
                            register={register} error={errors?.status?.message}
                        />
                        <Picture readablePicture={readablePicture} setReadablePicture={setReadablePicture} setPicture={setPicture} />
                        {/* If we have an error */}
                        {error ? <div>
                            <p className='text-red-400'>{error}</p>
                        </div> : null}
                        <button type='submit'
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                style={{ ...(status === "load" ? { display: "none" } : {}) }}>
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">
                                {status === 'load' ? <PulseLoader color="#fff" size={12} /> : 'Sign Up'}
                            </span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to EffiChat's
                            <a href="/" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                            and its
                            <a href="/" className="border-b border-gray-500 border-dotted"> Privacy Policy</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>)
}