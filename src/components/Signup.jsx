import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import authService from '../services/authService'
import Input from './utilities/Input'
import { ID } from "appwrite"
import { useNavigate } from "react-router-dom"
import { login as storeLogin } from "../features/authSlice"
import { useDispatch } from "react-redux"
import Spinner from "./utilities/Spinner"

function Signup() {

    const { handleSubmit, register } = useForm()
    let [errors, setErrors] = React.useState(null);
    let [loading,setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignup = async (data) => {
        try {
            setLoading(true)
            setErrors(null)
            if (data.password !== data.confirm) {
                setLoading(false)
                setErrors('Passwords don\'t match !');
                return;
            }
            const resp = await authService.createAccount({
                userId: ID.unique(),
                ...data
            })

            if (resp) {
                const login = await authService.login({email:data.email,password:data.password})
                const preferences = await authService.updatePreferences({
                    "bio":(data.bio == '') ? `I am ${data.name}` : data.bio
                })
                if(login && preferences){
                    dispatch(storeLogin(resp))
                    navigate('/')
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErrors(error.message)
            console.log(`${error.code} : ${error.message}`);
        }
    }

    return (
        <>
            <section className="grow bg-slate-400 py-10">
                <p className="text-center font-bold text-2xl lg:text-3xl underline underline-offset-3">Signup</p>
                <form className="bg-[#fff] shadow-xl py-10 rounded-md flex flex-col flex-nowrap items-center justify-center gap-6 mt-10 w-[94%] lg:w-[66%] mx-auto" onSubmit={handleSubmit(handleSignup)}>

                    <Input label={'Name : '} labelClassName={'text-[#454545] text-[0.925rem] whitespace-nowrap font-semibold lg:text-lg'} containerClassName={'flex justify-center gap-4'} type={'text'} {...register("name", { required: true })} />
                    <Input labelClassName={'text-[#454545] text-[0.925rem] whitespace-nowrap font-semibold lg:text-lg'} containerClassName={'flex justify-center gap-4'} label={'Email : '} type={'email'} {...register("email", { required: true })} />
                    <Input label={'Password : '} labelClassName={'text-[#454545] text-[0.925rem] whitespace-nowrap font-semibold lg:text-lg'} containerClassName={'flex justify-center w-[90%] lg:w-full gap-4'} type={'password'} {...register("password", { required: true })} />
                    <Input label={'Confirm : '} labelClassName={'text-[#454545] text-[0.925rem] whitespace-nowrap font-semibold lg:text-lg'} containerClassName={'flex justify-center gap-4'} type={'password'} {...register("confirm")} />

                    <section className="px-7 gap-4 mx-auto flex flex-nowrap">
                        <label className="text-[#454545] whitespace-nowrap font-semibold text-lg">Bio : </label>
                        <textarea maxLength={96} {...register("bio", { required: false })} className="bg-[#aaa] placeholder:text-[1rem] focus:outline-none rounded-md pl-3 w-[15rem] mx-auto placeholder:text-[#222] text-[#222] max-h-[8vh] py-2 text-[1.1rem]" placeholder="Something about you ..."></textarea>
                    </section>

                    {errors && <section className="text-red-600 mx-auto w-[85%] font-medium">
                        {errors}
                    </section>}

                    <button className="text-[#2b2b2b] font-semibold text-lg bg-[#00ADB5] w-[37.5vw] rounded-md py-[.3rem] pb-2 mt-3">Signup</button>
                    {loading && <Spinner />}

                </form>
            </section>
        </>
    )
}

export default Signup