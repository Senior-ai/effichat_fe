import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import GithubButton from './GithubButton';
import GoogleButton from './GoogleButton';
import { useNavigate } from 'react-router-dom';
import { loginUser, changeStatus } from '../../features/userSlice';
import { PulseLoader } from 'react-spinners';

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInSchema),
    });
    const onSubmit = async (data) => {
        console.log(data);
        dispatch(changeStatus("loading"));
        let res = await dispatch(loginUser({ ...data }))
        console.log(res);
        if (res?.payload?.user) {
            navigate('/');
        }
    };
    return (
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Form */}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <AuthInput
                    name="email" type="text" placeholder="Email"
                    register={register} error={errors?.email?.message}
                />
                <AuthInput
                    name="password" type="password" placeholder="Password"
                    register={register} error={errors?.password?.message}
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="remember_me" className="ml-1 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                {/* If we have an error */}
                {error ? <div>
                    <p className='text-red-400 text-sm'>{error}</p>
                </div> : null}
                <div>
                    <button type="submit"
                        className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <span className="ml-3">
                            {status === 'load' ? <PulseLoader color="#fff" size={10} /> : 'Sign in'}
                        </span>
                    </button>
                </div>
            </form>
            <div className="mt-6 items-center justify-center">

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-100 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex gap-3 items-center justify-center">
                    <GithubButton text='' />
                    <GoogleButton text='' />
                </div>
            </div>
        </div>)
}