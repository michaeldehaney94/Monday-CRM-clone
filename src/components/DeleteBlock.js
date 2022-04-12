import React from 'react'

const DeleteBlock = () => {

    const deleteTicket = () => {
        console.log('deleted!')
    }

  return (
    <div className='delete-block'>
        <div className='delete-icon' onClick={deleteTicket}>
            <img src="https://img.icons8.com/ios-glyphs/30/fa314a/xbox-x.png"/>
        </div>
    </div>
  )
}

export default DeleteBlock