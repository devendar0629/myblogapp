import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './store.js'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import EditProfile from './components/EditProfile.jsx'
import Post from './components/post/Post.jsx'
import PostForm from './components/post/PostForm.jsx'
import UserPosts from './components/post/UserPosts.jsx'
import AuthLayout from './components/authentication/AuthLayout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='' element={<Home />} />
                        <Route 
                            path='/signup' 
                            element={<AuthLayout isAuthRequired={false}>
                                        <Signup />
                                    </AuthLayout>} />
                        <Route 
                            path='/login' 
                            element={<AuthLayout isAuthRequired={false}>
                                        <Login />
                                    </AuthLayout>} />
                        <Route 
                            path='/:username/profile' 
                            element={<AuthLayout isAuthRequired={true}>
                                        <Profile />
                                    </AuthLayout>} />
                        <Route 
                            path='/:username/profile/edit' 
                            element={<AuthLayout isAuthRequired={true}>
                                        <EditProfile />
                                    </AuthLayout>} />
                        <Route 
                            path='/post/:postid' 
                            element={<AuthLayout isAuthRequired={true}>
                                        <Post />
                                    </AuthLayout>} />
                        <Route 
                            path='/post/:postid/edit' 
                            element={<AuthLayout isAuthRequired={true}>
                                        <PostForm />
                                    </AuthLayout>} />
                        <Route 
                            path='/myposts' 
                            element={<AuthLayout isAuthRequired={true}>
                                        <UserPosts />
                                    </AuthLayout>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)