import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CategoriesContext from '../context'

const TicketPage = ({ editMode }) => {
  const [formData, setFormData] = useState({
    status: 'not started',
    progress: 0,
    timestamp: new Date().toISOString(),
  })

  const {categories, setCategories} = useContext(CategoriesContext)
  const navigate = useNavigate()
  let { id } = useParams()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (editMode) {
      const response = await axios.put(`http://localhost:4000/tickets/${id}`, {
        data: formData
      })
    }

    if (!editMode) {
      console.log('posting')
      const response = await axios.put('http://localhost:4000/tickets', {
        formData,
      })
      
      const success = response.status === 200
      if (success) {
        navigate('/')
      }
    }
  }

  const fetchData = async() => {
    const response = await axios.get(`http://localhost:4000/tickets/${id}`)
    setFormData(response.data.data)
  }

  useEffect(() => {
    if (editMode) {
      fetchData()
    }
  })

  const handleChange = async(e) => {
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
                onChange={handleChange}
                required={true}
                value={formData.title}
              />

              <label htmlFor='description'>Description</label>
              <input 
                id='description'
                name='description'
                type='text'
                onChange={handleChange}
                required={true}
                value={formData.description}
              />

              <label>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
              >
                {categories?.map((category, _index) => (
                <option value={category}>{category}</option>
              ))}
              </select>

              <label htmlFor='new-category'>New Category</label>
              <input 
                id='new-category'
                name='category'
                type='text'
                onChange={handleChange}
                value={formData.category || categories[0]}
              />

              <label>Priority</label>
              <div className='multiple-input-container'>
                  <input
                    id='priority-1'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={1}
                    checked={formData.priority === 1}
                  />

                  <label htmlFor='priority-1'>1</label>
                  <input
                    id='priority-1'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={1}
                    checked={formData.priority === 1}
                  />

                  <label htmlFor='priority-2'>2</label>
                  <input
                    id='priority-2'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={2}
                    checked={formData.priority == 2}
                  />

                  <label htmlFor='priority-3'>3</label>
                  <input
                    id='priority-3'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={3}
                    checked={formData.priority == 3}
                  />

                  <label htmlFor='priority-4'>4</label>
                  <input
                    id='priority-4'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={4}
                    checked={formData.priority == 4}
                  />

                  <label htmlFor='priority-5'>5</label>
                  <input
                    id='priority-5'
                    name='priority'
                    type='radio'
                    onChange={handleChange} 
                    value={5}
                    checked={formData.priority == 5}
                  />
                  <label htmlFor='priority-1'>1</label>
              </div>

              {/* Progress bar */}
              {editMode && (
                <>
                  <input
                    type='range'
                    id='progress'
                    name='progress'
                    value={formData.progress}
                    min='0'
                    max='100'
                    onChange={handleChange}
                  />
                  <label htmlFor='progress'>Progress</label>
                  
                  <label>Status</label><select
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option selected={formData.status === 'done'} value='done'>Done</option>
                    <option selected={formData.status === 'work in progress'} value='work in progress'>Work in progress</option>
                    <option selected={formData.status === 'stuck'} value='stuck'>Stuck</option>
                    <option selected={formData.status === 'not started'} value='not started'>Not Started</option>
                  </select>
                </>
              )}
              
              <input type='submit' />
            </section>
            <section>
              <label htmlFor='owner'>Owner</label>
              <input
                id='owner'
                name='owner'
                type='text'
                onChange={handleChange}
                required={true}
                value={formData.owner} 
              />

              <label htmlFor='avatar'>Avatar</label>
              <input
                id='avatar'
                name='avatar'
                type='url'
                onChange={handleChange}
                required={true}
                value={formData.avatar} 
              />
              <div className='img-preview'>
                {formData.avatar && (
                  <img src={formData.avatar} alt="image preview"/>
                )}
              </div>
            </section>

          </form>
        </div>
    </div>
  )
}

export default TicketPage