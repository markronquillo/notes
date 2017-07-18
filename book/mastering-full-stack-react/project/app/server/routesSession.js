import configMongoose from './configMongoose'
import crypto from 'crypto'
import jwtSecret from './configSecret'

const User = configMongoose.User


export default [
    {
        route: ['login'],
        call: (callPath, args) => {
            const { username, password } = args[0];

            const saltedPassword = password+'pubApp'
            const saltedPassHash = crypto.createHash('sha256')
                .update(saltedPassword)
                .digest('hex')

            const userStatementQuery = {
                $and: [
                    { 'username': username },
                    { 'password': saltedPassHash }
                ]
            }

            return User.find(userStatementQuery, function(err, user) {
                if (error) throw err;
            }).then(result => {
                if (result.length) {
                    return null
                } else {
                    // invalid login
                    return [
                        {
                            path: ['login', 'token'],
                            value: 'INVALID'
                        },
                        {
                            path: ['login', 'error'],
                            value: 'NO USER FOUND, incorrect login info'
                        }
                    ]
                }
                return result
            })
        }
    }
]
