import React from "react"
import storageService from "../../services/storageService"
import { Query } from "appwrite"
import { useSelector } from "react-redux"
import PostPreview from './PostPreview'
import { useNavigate } from "react-router-dom"

function UserPosts() {

    const [posts,setPosts] = React.useState(null)
    const currentUser = useSelector(state => state.userData)

    const navigate = useNavigate()

    React.useEffect(() => {
        storageService.getAllPosts([Query.equal("userId",currentUser.$id)])
            .then((data) => {
                setPosts(data.documents)
            })
            .catch((error) => console.log(`${error.code} : ${error.message}`))
    },[])

    return (
        <>
            <section className="flex flex-wrap gap-4 py-5 justify-center mx-auto w-[85%] items-center">
                {
                    posts && posts.map((post) => <PostPreview key={post.slug} post={post} />)
                }

                {
                    (posts && posts.length == 0) && <div className="text-[#eee] text-xl whitespace-nowrap py-40 text-center">No Posts Yet .
                        <p onClick={() => {
                            navigate('/')
                        }} className="py-3.5 whitespace-nowrap cursor-pointer">
                            Start by creating a post <span className="text-2xl inline-block"> &nbsp;&rarr;</span>
                        </p>
                    </div>
                }
            </section>
        </>
    )
}

export default UserPosts