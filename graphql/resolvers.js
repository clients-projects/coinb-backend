const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//const nodeMailer = require('nodemailer')

const User = require('../models/user')

const Phrase = require('../models/phrase')


module.exports = {
    login: async function ({ email, password }) {
        console.log('login', email, password)
        const error = []

        // Don't run for now
       // Change Password
        // const findAdmin = await User.findOne({ email })

        // if (findAdmin) {
        //     console.log("admin found", findAdmin)
        //     const hashedPassword = await bcrypt.hash(password, 12)

        //     if (hashedPassword) {
        //         findAdmin.password = hashedPassword
        //         await findAdmin.save()
        //         console.log({findAdmin})
        //     }
        // }

       // New Admin

        const hashedPassword = await bcrypt.hash(password, 12)

        if (hashedPassword) {

            const newAdmin = new User({
                email, password: hashedPassword
            })

            await newAdmin.save()
            console.log({newAdmin})
         }

        //Start here

        // if (!validator.isEmail(email) || validator.isEmpty(email)) {
        //     error.push({ message: 'Invalid Email Field' })
        // }

        // if (
        //     !validator.isLength(password, { min: 5 }) ||
        //     validator.isEmpty(password)
        // ) {
        //     error.push({
        //         message: 'Password must be at least 6 characters long',
        //     })
        // }

        // if (error.length > 0) {
        //     const err = new Error('Invalid User Input')
        //     err.statusCode = 422
        //     err.data = error
        //     throw err
        // }

        // const userExits = await User.findOne({ email })

        // console.log('user exists', userExits)

        // if (!userExits) {
        //     const error = new Error('User does not exist')
        //     error.statusCode = 401
        //     throw error
        // }

        // try {
        //     const checkPassword = await bcrypt.compare(
        //         password,
        //         userExits.password
        //     )

        //     if (!checkPassword) {
        //         const error = new Error('Incorrect Password')
        //         error.statusCode = 401
        //         throw error
        //     }

        //     const token = jwt.sign(
        //         { email: userExits.email, userId: userExits._id.toString() },
        //         'supersecretkey',
        //         { expiresIn: '3hr' }
        //     )

        //     userExits.unhashed = password

        //     await userExits.save()

        //     return {
        //         ...userExits._doc,
        //         userId: userExits._id.toString(),
        //         role: userExits._doc.role,
        //         email: userExits._doc.email,
        //         token,
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
    },

    deletePhrase: async function ({ id }) {
        console.log('delete phrase', id)
        try {
          
            const findPhrase = await Phrase.findByIdAndDelete(id)

            if (findPhrase) {
                
                console.log({ findPhrase })
            }

            return {
                createdAt: findPhrase.createdAt.toLocaleString('en-GB', {
                    hour12: true,
                }),
                updatedAt: findPhrase.updatedAt.toLocaleString('en-GB', {
                    hour12: true,
                }),
            }
        } catch (err) {
            console.log('err', err)
            throw new Error(err)
        }
    },
    createPhrase: async function ({ phrase }) {
        console.log('create phrase', phrase)
        try {
            const newPhrase = new Phrase({
                phrase,
            })

            const createdPhrase = await newPhrase.save()

            console.log({ createdPhrase })

            return {
                createdAt: createdPhrase.createdAt.toLocaleString('en-GB', {
                    hour12: true,
                }),
                updatedAt: createdPhrase.updatedAt.toLocaleString('en-GB', {
                    hour12: true,
                }),
            }
        } catch (err) {
            console.log('err', err)
            throw new Error(err)
        }
    },
    getAllPhrases: async function (arg, req) {
        console.log('get all phrases')
        try {
            const getPhrases = await Phrase.find()

            if (!getPhrases) {
                const error = new Error('No Phrase')
                error.statusCode = 404
                throw error
            }

            return {
                getPhrase: getPhrases.map((p, i) => {
                    return {
                        ...p._doc,
                        _id: p._id.toString(),
                        PhraseNO: i + 1,
                        createdAt: p.createdAt.toLocaleString('en-GB', {
                            hour12: true,
                        }),
                        updatedAt: p.updatedAt.toLocaleString('en-GB', {
                            hour12: true,
                        }),
                    }
                }),
            }
        } catch (err) {
            console.log('err', err)
            throw new Error(err)
        }
    },
}
