const db = require('../data/db').instance
import { verifyIdToken } from 'next-firebase-auth'
import initAuth from '../firebase/initAuth'
import queryByUserName from '../../constants/db/users/queryByUserName'
initAuth()

const checkAPIAuth = async (req, res) => {
    console.log(`Validating user access...`)
    let creds
    const url = req.url.split('?')[0]
    const method = req.method
    if (!(req.headers && req.headers.authorization)) {
        //return res.status(400).json({ error: 'Missing Authorization header value' })
        console.error('Access Denied. Missing Authorization header value')
        return { error: 'Missing Authorization header value' }
    }
    const token = req.headers.authorization.split(' ')[1] //Bearer <token>
    try {
        creds = await verifyIdToken(token)
        const { email } = creds
        const data = await db.one(queryByUserName, email)
        let authorized = false
          if (data && data.roles) {
            if (data.roles.includes('ADMIN')) {
                //console.log('Admin, permission granted.')
                authorized = true
            } else {
                if (data.apiRouteAccess) {
                    for(let i = 0; i < data.apiRouteAccess.length; i++) {
                        if ( data.apiRouteAccess[i].appAPIRoutePath === url &&
                            data.apiRouteAccess[i].appAPIMethod === method ) authorized = true
                    }
                } 
            }
        } 
        //if (!authorized) return res.status(403).json({ error: 'Not authorized to access API Route.' })
        if (!authorized) {
            console.error(`Access Denied. Not authorized to access the API Route, ${method} ${url}`)
            return { error: `Not authorized to access the API Route, ${method} ${url}` }
        }
    } catch (e) {
        console.error(e)
        console.error(`Access DENIED for api route, ${method} ${url}`)
        //return res.status(403).json({ error: 'Not authorized' })
        return { error: 'Not authorized' }
    }
    console.log(`Access granted for api route, ${method} ${url}`)
    return creds
}

export default checkAPIAuth