import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import authService from "../services/authService"
import Input from "./utilities/Input"
import { login as storeLogin } from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"

function EditProfile() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const oldData = useSelector(state => state.userData)

    const handleSave = async (data) => {
        try {
            const resp1 = await authService.updateName(data.name)
            const resp2 = await authService.updatePreferences({
                "bio": data.bio
            })
            if (resp1 && resp2) {
                dispatch(storeLogin({ ...oldData, name: data.name, prefs: resp2.prefs }))
                navigate(-1);
            }
        } catch (error) {
            console.log(`${error.code} ${error.message}`);
        }
    }

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: oldData.name || '',
            bio: oldData.prefs.bio || ''
        }
    })

    return (
        <>
            <section>
                <form className="bg-[#fff] white flex flex-col flex-nowrap gap-5 mt-7 rounded-xl px-10 py-7 shadow-md w-[80%] mx-auto" onSubmit={handleSubmit(handleSave)}>
                    <Input
                        labelClassName='whitespace-nowrap font-medium' containerClassName='flex flex-nowrap gap-2 items-center' inputClassName='w-full' type='text'
                        {...register("name", { required: true })}
                        label='Name : ' />
                    <section className="w-full px-7 gap-4 mx-auto flex flex-nowrap">
                        <label className="text-[#454545] whitespace-nowrap font-semibold text-lg">Bio : </label>
                        <textarea maxLength={96} {...register("bio", { required: false })} className="grow bg-[#aaa] placeholder:text-[1rem] focus:outline-none rounded-md px-4 placeholder:text-[#666] text-[#222] py-2 text-[1.1rem]" placeholder="Something about you ..."></textarea>
                    </section>
                    <button
                        className="bg-green-400 text-lg rounded-lg px-3 py-1 pb-[.39rem] text-[#342] font-medium">Save</button>
                </form>
            </section>
        </>
    )
}

export default EditProfile