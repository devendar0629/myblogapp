import React from "react"

function Loading({ message = 'Loading ...' }){
    return(
        <>
            <main className="bg-[#222831] text-2xl font-semibold text-[#EEEEEE] flex justify-center items-center h-screen w-full">
                <p>{ message }</p>
            </main>
        </>
    )
}

export default Loading