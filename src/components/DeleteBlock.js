import React from 'react'
import axios from 'axios'

const DeleteBlock = () => {

    const deleteTicket = async() => {
        const response = await axios.delete(`http://localhost:4000/tickets/${documentId}`)
        const success = response.status == 200
        if (success) {
          window.location.reload()
        }
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