import React from "react"

const Input = React.forwardRef(function Input({ type = 'text', placeholder = '', label, labelClassName = '', inputClassName = '', initialStyles = true, containerClassName = '', ...props }, ref) {
    const id = React.useId()

    return (
        <>
            <section className={(() => {
                return initialStyles ? `w-full ${containerClassName}` : `${containerClassName}`
            })()}>

                <label 
                    className={
                        (() => {
                            return initialStyles ? `${labelClassName}` : `${labelClassName}`
                        })()
                    }
                    htmlFor={id}>{label}</label>

                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={(() => {
                        return initialStyles ? `px-3.5 pt-[.2rem] pb-[.3rem] text-lg outline-none bg-[#999] rounded-md ${inputClassName}` : `${inputClassName}`
                    })()} 
                    {...props} />

            </section>
        </>
    )
})

export default Input