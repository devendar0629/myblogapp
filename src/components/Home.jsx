import React from "react"
import { useSelector } from "react-redux"
import PostForm from "./post/PostForm"
import storageService from "../services/storageService"
import PostPreview from "./post/PostPreview"
import Loading from "./utilities/Loading"

function Home() {

    const loginStatus = useSelector(state => state.loginStatus)
    const userData = useSelector(state => state.userData)
    let [loading,setLoading] = React.useState(false)
    let [posts,setPosts] = React.useState(null)

    React.useEffect(() => {

        if(loginStatus){
            setLoading(true)
            storageService.getAllPosts()
                .then((data) => {
                    setPosts(data.documents)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(`${err.code} : ${err.message}`);
                })
        }

    }, [])

    return (
        <>
            {
                loading && <Loading />
            }

            {
                (loginStatus)
                    ? (<section className="w-[85%] mx-auto flex flex-col mb-9 flex-nowrap gap-4">
                        <PostForm />
                        <section className="flex flex-wrap gap-4 justify-center items-center">
                            {
                                posts && posts.map((post) => {
                                    return <PostPreview key={post.$id} post={post} />
                                })
                            }
                        </section>
                    </section>)

                    : (<div className="text-white text-center text-2xl font-medium my-40">Please login to view Posts</div>)
            }
        </>
    )
}

export default Home