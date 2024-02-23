import React from "react"
import storageService from "../../services/storageService"
import { useNavigate } from "react-router-dom"
import CommentForm from "../comment/CommentForm"

function PostPreview({ post }) {

    const navigate = useNavigate()

    const handlePostClick = () => {
        navigate(`/post/${post.$id}`)
    }

    return (
        <>
            <article className="grow flex flex-col gap-[0.625rem] px-5 py-4 rounded-md bg-slate-400 flex-nowrap">
                {
                    post && <section className="flex flex-nowrap justify-between items-baseline w-full">
                        <p className="text-xl ml-0.5 font-semibold font-mono">~ {post.userName}</p>
                        <p className="text-sm text-gray-900 font-normal pb-[.1rem] pr-[.12rem]">{post.creationDate}</p>
                    </section>
                }

                {
                    post && <section className="flex flex-nowrap gap-[1.2rem] min-w-[20vw] cursor-pointer grow rounded-lg" onClick={handlePostClick}>
                        <img className="rounded-lg align-bottom shadow-md" height={150} width={150} src={storageService.getFilePreview(post.fileId)} alt="" />
                        <p className="text-lg py-2 px-4 rounded-lg shadow-md min-w-[20vw] grow bg-[#EEE]">{post.content}</p>
                    </section>
                }

                {
                    post && <CommentForm post={post} />
                }
            </article>
        </>
    )
}

export default PostPreview