import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./utilities/Loading"
import authService from "../services/authService"
import { useNavigate } from "react-router-dom"
import { logout as storeLogout } from "../features/authSlice"

function Profile() {

    const loginStatus = useSelector(state => state.loginStatus)
    let userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [loggingOut,setLoggingOut] = React.useState(false)

    React.useEffect(() => {
        ;(async () => {
            const sessions = await authService.getAllSessions()
            console.log(sessions);
        })()
    },[])

    const handleEdit = () => {
        navigate('./edit'); // append edit to current url
        // navigate('../') => go to base url('/')
    }

    const handleLogout = async () => {
        try {
            setLoggingOut(true)
            const resp = await authService.logout()
            if(resp){
                setLoggingOut(false)
                dispatch(storeLogout())
                navigate('/')
            }
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    return (
        <>

            {
                loggingOut && <Loading message="Logging out ..." />
            }

            {
                loginStatus && <main className="bg-[#393E46] flex flex-col flex-nowrap text-lg grow text-slate-200 items-start gap-2">
                    <ul className="flex flex-col items-start mt-5 bg-zinc-800 rounded-lg px-7 py-6 flex-nowrap gap-[8.5vh] w-[95.5%] mx-auto">
                        <section className={'flex flex-col flex-nowrap gap-4'}>
                            <li>Name : {userData.name}</li>
                            <li>Email : {userData.email}</li>
                            <li>Bio : {userData.prefs.bio}</li>
                            <button onClick={handleEdit} className="bg-[#393E46] rounded-lg px-2.5 font-medium text-lg py-1 pb-1.5">Edit profile &nbsp; ✏️</button>
                        </section>
                        <button className={'bg-[#393E46] rounded-lg px-3.5 font-medium text-lg pb-1 pt-0.5'} onClick={handleLogout}>Logout</button>
                    </ul>
                </main>
            }
        </>
    )
}

export default Profile