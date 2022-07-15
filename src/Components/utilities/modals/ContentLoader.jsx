import React from 'react'
import Spinner from './Spinner'

const ContentLoader = ({ border }) => {
    return (
        <div className={`text-center py-1 ${border ? 'border' : ''} bg-light`}>
            <Spinner />
        </div>
    )
}

export default ContentLoader