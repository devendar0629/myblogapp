import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import Input from './utilities/Input'
import { useNavigate } from "react-router-dom"
import { login as storeLogin } from '../features/authSlice'
import { useDispatch } from "react-redux"
import Spinner from "./utilities/Spinner"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { handleSubmit, register } = useForm()
    let [errors,setErrors] = React.useState(null)
    let [loading,setLoading] = useState(false)

    const handleLogin = async (data) => {
        setLoading(true)
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
        setLoading(false)
        } catch (error) {
            setLoading(false)
            if(error.code == 401)
                setErrors(error.message)
        }
    }

    return (
        <>
            <section className="grow bg-slate-400 py-10">
                <p className="text-center font-bold text-2xl lg:text-3xl underline underline-offset-3">Login</p>
                <form className="bg-[#fff] shadow-xl py-12 rounded-md flex flex-col flex-nowrap items-center justify-center gap-6 mt-10 lg:w-[66%] w-[92%] mx-auto" onSubmit={handleSubmit(handleLogin)}>

                    <Input labelClassName={'text-[#454545] font-semibold text-[.95rem] lg:text-lg flex-nowrap'} containerClassName={'flex items-center justify-center gap-4'} label={'Email : '} type={'email'} {...register("email", {
                        required: true
                    })} />
                    <Input inputClassName={'w-[65%] lg:w-fit'} label={'Password : '} labelClassName={'text-[#454545] text-md text-[.925rem] lg:text-lg font-semibold'} containerClassName={'flex items-center w-[60%] justify-center mx-auto gap-4 lg:w-full'} type={'password'} {...register("password",{ required:true })} />

                    {errors && <section className="text-red-600 w-[80%] lg:w-[90%] mx-auto mt-1 font-medium">
                        {errors}
                    </section>}

                    <button className="text-[#222831] font-semibold text-lg bg-[#00ADB5] w-[37.5vw] rounded-md py-[.28rem] pb-2 mt-5">Login</button>
                    {loading && <Spinner />}

                </form>
            </section>
        </>
    )
}

export default Login