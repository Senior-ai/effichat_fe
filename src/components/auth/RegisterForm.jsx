import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from "../../utils/validation";
import AuthInput from './AuthInput';
import GoogleButton from './GoogleButton';
import GithubButton from './GithubButton';
export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const onSubmit = (data) => console.log(data);
    return (
        <div className="mt-6 flex flex-col items-center">
            {/* Heading */}
            <h2 class="text-xl xl:text-xl font-extrabold">
                Sign up
            </h2>
            {/* Container */}
            <div class="w-full flex-1 mt-4">
                {/* 3rd party Buttons */}
                <div className="flex flex-col items-center">
                    <GoogleButton />
                    <GithubButton />
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="my-2 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>
                    <div className="mx-auto max-w-xs">
                        <AuthInput
                            name="name" type="text" placeholder="Name"
                            register={register} error={errors?.name?.message}
                        />
                        <AuthInput
                            name="Email" type="email" placeholder="Email address"
                            register={register} error={errors?.email?.message}
                        />
                        <AuthInput
                            name="password" type="password" placeholder="Password"
                            register={register} error={errors?.password?.message}
                        />
                        <AuthInput
                            name="Status" type="text" placeholder="Status - optional"
                            register={register} error={errors?.status?.message}
                        />
                        <button type='submit'
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <p class="mt-6 text-xs text-gray-600 text-center">
                            I agree to EffiChat's
                            <a href="/" class="border-b border-gray-500 border-dotted"> Terms of Service </a>
                            and its
                            <a href="/" class="border-b border-gray-500 border-dotted"> Privacy Policy</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>)
}