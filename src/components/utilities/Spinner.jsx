import "./Spinner.css"

export default function Spinner({ className = '' }) {
    return (
        <>
            <div className={`spinner h-10 w-10 border-[5px] border-t-slate-500 border-slate-200 ${className}`}>
            </div>
        </>
    )
}