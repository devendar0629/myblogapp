import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import storageService from "../../services/storageService"
import { useSelector } from "react-redux"

// TODO : MAKE IT DROP DOWN AND SHOW COMMENTS

function CommentForm({ post }) {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const userData = useSelector(state => state.userData)

    const getDateAsString = (date) => {
        let creationDate = ''

        creationDate = creationDate.concat(
            String(date.getDate()),
            '-',
            String(date.getMonth() + 1),
            '-',
            String(date.getFullYear())
        )

        return creationDate
    }

    const handleComment = async (data) => {
        try {
            const resp = await storageService.updatePost(
                post.$id,
                {
                    comments: [
                        ...post.comments,
                        { message: data.comment, creationDate: getDateAsString(new Date(Date.now())), userId: userData.$id, userName: userData.name }
                    ]
                }
            )

            if (resp) {
                navigate(0)
            }
        } catch (error) {
            console.log(`${error.code} ${error.message}`);
        }
    }

    const showAllComments = () => {
        navigate(`post/${post.$id}`);
    }

    return (
        <>
            <section className="flex gap-1.5 flex-col flex-nowrap">
                <form className="flex flex-nowrap gap-3 grow" onSubmit={handleSubmit(handleComment)}>
                    <input placeholder="Add a comment ..." className="grow px-3 py-0.5 text-[1rem] placeholder:text-sm placeholder:text-gray-500 text-gray-700 focus:outline-offset-[1.75px] outline-[.75px] rounded-md shadow-md" type="text" {...register("comment", {
                        required: true
                    })} />
                    <button className="bg-slate-600 shadow-md outline-[.75px] rounded-md px-2 py-1">💬</button>
                </form>

                {
                    post.comments.length > 0 && <section className="px-[.075rem] flex flex-nowrap gap-2 items-baseline pt-[.18rem] text-[1.1rem]">
                        <span className="font-medium whitespace-nowrap">~ {post.comments[0].userName} :</span> <span className="text-[1rem]">{post.comments[0].message}</span>
                    </section>
                }

                {
                    post.comments.length > 1 && <button onClick={showAllComments} className="w-fit px-[.22rem] text-gray-700 pb-0.5 font-semibold text-[.905rem]">View all comments <span className="text-xl pt-1">&rarr;</span></button>
                }

                {
                    post.comments.length == 0 && <p className="px-[.1rem] text-gray-700 py-[.1rem] font-semibold text-[.905rem]">No comments yet .</p>
                }
            </section>
        </>
    )
}

export default CommentForm