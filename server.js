const port = 4000 || process.env.port
const express = require('express')
//middleware for making HTTP request
const cors = require('cors')
//use to save configuration in env separate from code and store api key
//this will allow the api key to not be uploaded on github
require('dotenv').config()
//make promise base HTTP client request
const axios = require('axios')

const app = express()
app.use(cors())
//to process json data from collection
app.use(express.json())

//url and token to access database collection in DataStax Astra
const dbcollectionUrl = process.env.URL
const databaseToken = process.env.ASTRA_TOKEN

app.get('/tickets', async(req, res) => {
    const options = {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
          'X-Cassandra-Token': databaseToken,
        }
    }

    try {
        const response = await axios(`${dbcollectionUrl}?page-size=20`, options)
        res.status(200).json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
        
    }

});

app.get('/tickets/:documentId', async(req, res) => {
    const id = req.params.documentId

    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': databaseToken
        },
    }
    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error});
    }
});

app.post('/tickets', async(req, res) => {
    const formData = req.body.formData
    const options = {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'X-Cassandra-Token': databaseToken,
          'Content-Type': 'application/json',
        },
        data: formData,
      }

    try {
        const response = await(dbcollectionUrl, options)
        res.status(200).json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error});
    }
});

app.put('/tickets/:documentId', async(req, res) => {
    const id = req.params.documentId
    const data = req.body.data

    const options = {
        method: 'PUT',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': databaseToken
        },
        data
    }
    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: error});
    }
});

app.delete('/tickets/:documentId', async(req, res) => {
    const id = req.params.documentId

    const options = {
        method: 'DELETE',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': databaseToken
        }
    }
    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error});

    }

    
});





app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

