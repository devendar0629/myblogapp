import React, { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import storageService from "../../services/storageService"
import Loading from "../utilities/Loading";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import Spinner from "../utilities/Spinner";

function Post() {

    const { postid } = useParams();

    let [post, setPost] = React.useState(null)
    let [loading, setLoading] = React.useState(false)
    let [deleting,setDeleting] = useState(false)
    const [isOwner, setIsOwner] = React.useState(false)
    const [comments, setComments] = React.useState(null)

    const loggedUserData = useSelector(state => state.userData)

    const navigate = useNavigate()

    const handlePostDelete = async () => {
        try {
            setDeleting(true)
            const fileDelete = await storageService.deleteFile(post.fileId)
            if (fileDelete) {
                const postDelete = await storageService.deletePost(post.$id)
                
                if (postDelete) {
                    navigate(-1)
                }
            }
            setDeleting(false)
        } catch (error) {
            setDeleting(false)
            console.log(`${error.code} : ${error.message}`);
        }
    }

    const handlePostEdit = () => {
        navigate(`./edit`)
    }

    React.useEffect(() => {
        setLoading(true)

        storageService.getPost(postid)
            .then((data) => {
                setPost(data)
                setLoading(false)

                if (data.userId == loggedUserData.$id) {
                    setIsOwner(true)
                }
            })
            .catch((error) => console.log(`${error.code} : ${error.message}`))

    }, [])

    return (
        <>

            {
                loading && <Loading />
            }

            {
                post && <section className="bg-slate-600 flex flex-col flex-nowrap gap-8 mt-8 rounded-lg justify-start items-start mb-9 px-3 lg:px-8 pb-8 pt-6 w-[94%] lg:w-[70%] mx-auto">
                    {
                        isOwner && <section className="w-full -mb-[.4rem] text-lg right-8 flex flex-nowrap gap-3 justify-end">
                            <button onClick={handlePostEdit} className="px-3 rounded-md text-center py-[0.3rem] select-none bg-green-600">✏️</button>
                            <button onClick={handlePostDelete} className="px-3 rounded-md text-center py-[0.35rem] select-none bg-red-500">🗑️</button>
                        </section>
                    }

                    {
                        deleting && <Spinner className="ml-auto border-slate" />
                    }

                    <section className="w-full bg-[#ddd] rounded-md py-2 flex flex-nowrap flex-col gap-2 px-6">
                        {
                            <section className="flex flex-nowrap justify-between items-baseline py-0.5 w-full">
                                <p className="text-xl ml-0.5 font-semibold font-mono">~ {post.userName}</p>
                                <p className="text-sm text-gray-700 font-normal pb-[.1rem] pr-[.12rem]">{post.creationDate}</p>
                            </section>
                        }
                        <img className="align-bottom -mt-2 bg-gray-400 rounded-lg shadow-2xl w-full h-[20rem]" src={storageService.getFilePreview(post.fileId, 1050, 1000)} alt="" />
                        <p className="font-medium whitespace-nowrap text-lg">{post.content}</p>
                    </section>

                    <section className="bg-gray-300 w-full py-3 px-6 rounded-md">
                        {
                            <p className="text-[1rem] pb-1 -ml-1 font-medium">Post comments :</p>
                        }

                        {
                            post.comments.length > 0 && post.comments.map((comment) => {
                                return (
                                    <p className="ml-1.5 py-[.05rem] flex flex-row flex-nowrap" key={comment.$id}>
                                        <span className="opacity-[0.99] font-medium whitespace-nowrap">~ {comment.userName} :</span> <span className="text-[1rem]">{comment.message}</span>
                                    </p>
                                )
                            })
                        }

                        {
                            post.comments.length == 0 && <p className="pl-[.65rem] text-gray-700 py-[.1rem] font-semibold text-[.905rem]">No comments yet .</p>
                        }
                    </section>
                </section>
            }
        </>
    )
}

export default Post