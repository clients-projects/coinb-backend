// const express = require('express')
// const apps = require('./api/apps')

// const app = express()

// app.use(apps)

// const PORT = process.env.PORT || 3030

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

import express from 'express'
import { json } from 'body-parser'
import { connect } from 'mongoose'

import auth from './middleware/is-Auth'

import { graphqlHTTP } from 'express-graphql'
import graphqlSchema from './graphql/schema'
import graphqlResolver from './graphql/resolvers'

const app = express()

app.use(json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.get('/', (req, res) => {
    res.send('Welcome to dappwebtokenwallet')
})

app.use(auth)

app.use(
    '/api/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err
            }

            const message = err.message || 'An error occurred'
            const statusCode = err.originalError.statusCode || 500
            const data = err.originalError.data

            return {
                message,
                statusCode,
                data,
            }
        },
    })
)

app.use((error, req, res, next) => {
    console.log(error, error.errorMessage)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})
console.log('the env process', process.env.NODE_ENV)

connect(
        `mongodb+srv://coinb:KFi4iMXwDMwskCkT@cluster0.nlhga.mongodb.net/database?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })

    })
    .catch((err) => console.log(err))

