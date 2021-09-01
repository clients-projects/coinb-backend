const { buildSchema } = require('graphql')

module.exports = buildSchema(`

    type Phrase {
        _id: ID!     
        phraseNO: Int
        createdAt: String!
        updatedAt: String!
        phrase: String
    }


    type User {
        _id: ID!
        email: String!
        password: String!
        role: String
        createdAt: String!
        updatedAt: String!
    }

    input IPhrase {
        phrase: String
    }

    type AuthData {
        token: String!
        userId: String!
        role: String!
        email: String!
    }

    type GetPhrases {
        getPhrase: [Phrase]
    }
    
    type RootMutation {
        createPhrase(phrase: String): Phrase
        deletePhrase(id:ID): Phrase
        
    }

    type rootQuery{
        login(email: String, password: String): AuthData!
        getAllPhrases: GetPhrases
        
    }

    schema {
        query: rootQuery
        mutation: RootMutation
    }
`)
