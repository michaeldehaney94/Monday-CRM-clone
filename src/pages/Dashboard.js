import React, { useState, useEffect, useContext} from 'react'
import TicketCard from '../components/TicketCard';
import { axios } from 'axios'
import CategoriesContext from '../context';

const Dashboard = () => {
  const [tickets, setTickets] = useState(null)
  //const [categories, setCategories] = useState(null)
  const {categories, setCategories} = useContext(CategoriesContext)

  useEffect(async () => {
    const response = await axios.get('http://localhost:4000/tickets')

    //access the collection body
    const dataObject = response.data.data

    //access document keys from collection
    const arrayOfKeys = Object.keys(dataObject)

    //map data to ana array to retrieve data
    const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])

    const formatArray = []

    arrayOfKeys.forEach((key, index) => {
      const formatData = {...arrayOfData[index]}
      formatData['documentId'] = key
      formatData.push(formatArray)
    })

    setTickets(formatArray)
  }, [])

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category}) => category))])
  }, [tickets])

  
  // const tickets = [
  //   {
  //     category: 'Q1 2022',
  //     title: 'NFT Safety 101 Video',
  //     owner: 'Michael Dehaney',
  //     avatar: 'https://www.animeclick.it/immagini/personaggio/Tanjiro_Kamado/cover/93137-Tanjiro_Kamado-foto.jpg',
  //     status: 'completed',
  //     priority: 5,
  //     progress: 40,
  //     description: 'Make a video showcasing how to work with NFTs safely, including how to know if one is not genuine.',
  //     timestamp: '12-04-22 12:00:17'
  //   }, {
  //     category: 'Q1 2022',
  //     title: 'Build and sell AI Model',
  //     owner: 'Olivia Smith',
  //     avatar: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2022/01/Nezuko-Featured.jpg?q=50&fit=crop&w=943&h=500&dpr=1.5',
  //     status: 'work in progress',
  //     priority: 2,
  //     progress: 70,
  //     description: 'Make a video about AI',
  //     timestamp: '15-04-22 2:00:17'
  //   }, {
  //     category: 'Q2 2022',
  //     title: 'Build a bot',
  //     owner: 'Henry Morgan',
  //     avatar: 'https://image.artistshot.com/d.23958962.452194.s3.1-111111-bm9uZQ-200x200.jpg',
  //     status: 'working in progress',
  //     priority: 3,
  //     progress: 10,
  //     description: 'Make a video about making a bot',
  //     timestamp: '16-04-22 09:00:17'
  //   },
  // ]
  const colors = [
    'rgb(255,179,186)',
    'rgb(255,223,186)',
    'rgb(255,255,186)',
    'rgb(186,255,201)',
    'rgb(186,255,255)'
  ]

  // function to find each unique category in array
  // checks if data exist and unique and then get the category data from database
  const uniqueCategories = [
    setCategories(...new Set(tickets?.map(({category}) => category)))
  ]

  return (
    <div className='dashboard'>
      <h1>My Projects</h1>
      <div className='ticket-container'>
        {/* stores all our tickets in container */}
        {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex}>
            <h3>{uniqueCategory}</h3>
            {tickets.filter(ticket => ticket.category === uniqueCategory)
              .map((filteredTicket, _index) => (

                <TicketCard 
                  id={_index} 
                  color={colors[categoryIndex] || colors[0]} 
                  ticket={filteredTicket}
                  />
              ))
            }
          </div>
        ))}

      </div>
        
    </div>
  )
}

export default Dashboard