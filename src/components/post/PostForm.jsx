import React from "react"
import { useForm } from "react-hook-form"
import Input from "../utilities/Input"
import storageService from '../../services/storageService'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import { Query, ID } from "appwrite"
import Spinner from "../utilities/Spinner"

function PostForm() {

    const userData = useSelector(state => state.userData)
    const navigate = useNavigate();
    let [isUploading,setIsUploading] = React.useState(false)
    let [previousPost, setPreviousPost] = React.useState(null)

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

    const getSlug = (message, maxLimit = 36) => {
        let slug = message
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")

        if (slug.length > maxLimit) {
            slug = slug.substring(0, maxLimit);
        }
        let start = 0, end = slug.length - 1;

        for (start = 0; (start < slug.length) && (slug.charAt(start) == '-'); start++) {
            start++;
        }

        for (end = end; (end >= 0) && ((slug.charAt(end) == '-')); end--) {
            end--
        }

        slug = slug.substring(start, end + 1);

        return slug
    }

    const { postid } = useParams();

    React.useEffect(() => {
        const func = async function () {
            if (postid) {
                const post = await storageService.getAllPosts([Query.equal("$id", postid)])
                if (post) {
                    setValue("message", post.documents[0].content)
                    setPreviousPost(post.documents[0])
                }
            }
        }
        func()
    }, [])

    const { register, handleSubmit, setValue } = useForm({})

    const handlePost = async (data) => {
        try {
            setIsUploading(true)
            if (postid) {
                if (data.file.length >= 1) {
                    let fileUpload = await storageService.uploadFile(data.file[0])
                    if (fileUpload) {
                        const fileDelete = await storageService.deleteFile(previousPost.fileId)
                        if (fileDelete) {
                            const update = await storageService.updatePost(previousPost.$id, {
                                fileId: fileUpload.$id,
                                content: data.message,
                                slug: getSlug(data.message)
                            })
                            if (update) {
                                navigate('/')
                            }
                        }
                    }
                } else {
                    const update = await storageService.updatePost(previousPost.$id, {
                        content: data.message,
                        slug: getSlug(data.message)
                    })
                    if (update) {
                        navigate('/')
                    }
                }

            } else {
                if (data.file[0]) {
                    let fileUpload = await storageService.uploadFile(data.file[0])
                    if (fileUpload) {

                        let date = getDateAsString(new Date(Date.now()))

                        let slug = getSlug(data.message, 65)

                        const postCreate = await storageService.createPost({
                            content: data.message,
                            fileId: fileUpload.$id,
                            userId: userData.$id,
                            creationDate: date,
                            slug,
                            userName: userData.name
                        })

                        if (postCreate) {
                            navigate(0); // refreshes the current page
                        }
                    }
                }
            }
            setIsUploading(false)
        } catch (error) {
            setIsUploading(false)
            console.log(`${error.code} : ${error.message}`);
        }
    }

    return (
        <>
            <section className="mt-8">
                <form onSubmit={handleSubmit(handlePost)} className="bg-[#171717] flex flex-col px-6 py-6 lg:px-10 lg:py-10 rounded-lg shadow-lg items-center flex-nowrap w-full gap-7">
                    <Input
                        labelClassName={'text-[#EEE] text-md lg:text-lg font-medium whitespace-nowrap'}
                        inputClassName={'file:rounded-lg hover:file:bg-sky-600 hover:file:shadow-lg hover:file:text-[#fff] file:text-lg mr-[-20px] file:font-medium font-medium text-[#eee] lg:file:px-4 file:py-[.195rem] file:cursor-pointer file:bg-white lg:file:mr-4 file:border-none shadow-md'}
                        containerClassName={'flex flex-row gap-2 ml-10 lg:ml-0 items-center'}
                        initialStyles={false}
                        label='Image : '
                        type='file'
                        {...register("file", { required: false })}
                    />
                    {
                        previousPost && <section className="bg-[#ede] px-5 py-4 rounded-md">
                            <img className="rounded-md" src={storageService.getFilePreview(previousPost.fileId)} alt="" />
                        </section>
                    }
                    <Input
                        labelClassName={'text-[#EEE] font-medium whitespace-nowrap text-md lg:text-lg'}
                        initialStyles={false}
                        containerClassName={'flex flex-nowrap gap-2 items-center'}
                        inputClassName={'rounded-md h-[4vh] font-medium bg-[#999] pt-[.1rem] pb-[.2rem] px-3.5 text-md lg:text-lg focus:outline-none'}
                        type='text'
                        label='Message : '
                        {...register("message", { required: true })}
                    />
                    <button className="text-[#222] w-[60%] rounded-md px-3 pt-[0.12rem] font-medium pb-[.25rem] text-md lg:text-lg bg-sky-400 select-none hover:opacity-85">Post</button>
                    {isUploading && <div>
                        <Spinner className="border-[#171717] border-t-slate-50" />
                    </div>}
                </form>
            </section>
        </>
    )
}

export default PostForm