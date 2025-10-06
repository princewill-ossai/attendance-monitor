import React from 'react'
import loader from '../../Assets/Loader.gif'
import '../EmptyFolder/EmptyFolder.css'

const Loader = ({ shouldDisplay }) => {
    return (
        shouldDisplay &&
        <div className='flex justify-center items-center loader-vh'>
            <img className='w-[90px] h-[90px]' src={loader} alt='Loader' />
        </div>
    )
}

export default Loader
