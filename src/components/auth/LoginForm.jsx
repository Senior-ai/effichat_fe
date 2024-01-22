import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import GithubButton from './GithubButton';
import GoogleButton from './GoogleButton';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signInSchema),
    });
    const onSubmit = (data) => console.log(data);
    return (
        <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Form */}
            <form class="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <AuthInput
                    name="email" type="text" placeholder="Email"
                    register={register} error={errors?.email?.message}
                />
                <AuthInput
                    name="password" type="password" placeholder="Password"
                    register={register} error={errors?.password?.message}
                />

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="/" class="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                        Sign in
                    </button>
                </div>
            </form>
            <div class="mt-6 items-center justify-center">

                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-gray-100 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div class="mt-4 flex gap-3 items-center justify-center">
                    <GithubButton text=''/>
                    <GoogleButton text=''/>
                </div>
            </div>
        </div>)
}