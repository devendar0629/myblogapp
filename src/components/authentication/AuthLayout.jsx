import React from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, isAuthRequired = true }) {

    const navigate = useNavigate()
    const loginStatus = useSelector(state => state.loginStatus)
    const [loading,setLoading] = React.useState(true)

    React.useEffect(() => {
        if(isAuthRequired == true && loginStatus == false){
            navigate('/login')
        }
        else if(isAuthRequired == false && loginStatus == true){
            navigate('/')
        }

        setLoading(false)
    }, [loginStatus])

    return (
        <>
            {(loading == false) && <>{children}</>}
        </>
    )
}

export default AuthLayout