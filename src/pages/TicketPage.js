import React, {useState} from 'react'

const TicketPage = () => {
  const [formData, setFormData] = useState({
    status:'not started',
    progress: 0,
    timestamp: new Date.toISOString()
  })

  const editMode = false;

  const handleSubmit = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
      })
    )

  }
  console.log(formData)

  return (
    <div className='ticket'>
        <h1>{editMode ? 'Update Ticket' : 'Create a Ticket'}</h1>
        <div className='ticket-container'>
          <form onSubmit={handleSubmit}>

            <section>
              <label htmlFor='title'>Title</label>
              <input 
                id='title'
                name='title'
                type='text'
                onChange={handleSubmit}
                required={true}
                value={FormData.title}
              />
            </section>


          </form>
        </div>
    </div>
  )
}

export default TicketPage