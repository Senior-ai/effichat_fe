import React from 'react'
import AuthInput from './common/AuthInput'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPassSchema } from '../../utils/validation';
import { PulseLoader } from 'react-spinners';
import { changeStatus } from '../../features/userSlice';
export default function ForgotPassForm() {
    const dispatch = useDispatch();
    const {status, error} = useSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPassSchema),
    });
    const onSubmit = async (data) => {
        if (error) {
            error = ''
        }
        dispatch(changeStatus("loading"));
        // let res = await dispatch(loginUser({ ...data }))
        // if (res?.payload?.user) {
        // }
    };
    return (
        <div className='bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div class="grid gap-y-4">
                    <AuthInput name="email" type="text" placeholder="Email"
                    register={register} error={errors?.email?.message}/>
                    <div>
                    <button type="submit"
                        className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <span className="ml-3">
                            {status === 'loading' ? <PulseLoader color="#fff" size={10} /> : 'Reset password'}
                        </span>
                    </button>
                </div>
                </div>
            </form>


            <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
                <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    View Github
                </a>
                <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">

                    Contact us!
                </a>
            </p>
        </div>
    )
}
