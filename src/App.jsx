import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './services/authService'
import { useDispatch } from 'react-redux'
import { login as storeLogin, logout as storeLogout } from './features/authSlice'
import Loading from './components/utilities/Loading'

function App() {

    const loginStatus = useSelector(state => state.loginStatus)
    let [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        ; (async () => {
            try {
                const sessions = await authService.getAllSessions()
                if (!sessions) {
                    dispatch(storeLogout())
                    navigate('/login')
                } else {
                    const user = await authService.getCurrentUser()
                    if (user) {
                        dispatch(storeLogin(user))
                        navigate('/')
                    }
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        })()

        // authService.getCurrentUser()
        //     .then((data) => {
        //         if (data) dispatch(storeLogin(data))
        //         else dispatch(storeLogout())
        //     })
        //     .catch((error) => console.log(error))
        //     .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {(!loading) ? (
                <main className='flex flex-col min-h-screen w-full bg-[#222831]'>
                    <Header />
                    <Outlet />

                </main>
            ) : (<Loading />)}
        </>
    )
}

export default App
