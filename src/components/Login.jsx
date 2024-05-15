import React from "react"
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import Input from './utilities/Input'
import { useNavigate } from "react-router-dom"
import { login as storeLogin } from '../features/authSlice'
import { useDispatch } from "react-redux"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { handleSubmit, register } = useForm()
    let [errors,setErrors] = React.useState(null)

    const handleLogin = async (data) => {
        try {
            setErrors(false)
            const resp = await authService.login(data);
            if(resp) {
                const data = await authService.getCurrentUser();
                if(data) {
                    dispatch(storeLogin(data));
                    navigate('/')
                }
            }
        } catch (error) {
            if(error.code == 401)
                setErrors(error.message)
        }
    }

    return (
        <>
            <section className="grow bg-slate-400 py-10">
                <p className="text-center font-bold text-3xl underline underline-offset-3">Login</p>
                <form className="bg-[#fff] shadow-xl py-12 rounded-md flex flex-col flex-nowrap items-center justify-center gap-6 mt-10 lg:w-[66%] w-[92%] mx-auto" onSubmit={handleSubmit(handleLogin)}>

                    <Input labelClassName={'text-[#454545] font-semibold text-md lg:text-lg flex-nowrap'} containerClassName={'flex justify-center gap-4'} label={'Email : '} type={'email'} {...register("email", {
                        required: true
                    })} />
                    <Input label={'Password : '} labelClassName={'text-[#454545] text-md lg:text-lg font-semibold'} containerClassName={'flex justify-center gap-4'} type={'password'} {...register("password",{ required:true })} />

                    {errors && <section className="text-red-600 font-medium">
                        {errors}
                    </section>}

                    <button className="text-[#222831] font-semibold text-lg bg-[#00ADB5] w-[37.5vw] rounded-md py-[.28rem] pb-2 mt-5">Login</button>

                </form>
            </section>
        </>
    )
}

export default Login