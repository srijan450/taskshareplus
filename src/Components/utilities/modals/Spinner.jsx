import React, { useEffect, useState } from 'react'

const Spinner = () => {
    const arr = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];
    const [color, setcolor] = useState(-1)

    useEffect(() => {

        const x = setInterval(() => {
            setcolor((prev) => {
                prev++;
                return (prev == 8) ? 0 : prev;
            });
        }, 2000)

        return () => {
            clearTimeout(x);
        }


    }, [])

    return (
        <div className={`spinner-border text-${arr[color]}`} style={{ height: "40px", width: "40px" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner