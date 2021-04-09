//import db from '../../utils/data/db'
// Use a symbol to store a global instance of a connection, and to access it from the singleton.
// This fix the WARNING: Creating a duplicate database object for the same connection.
const db = require('../../../../utils/data/db').instance
import rateLimit from '../../../../utils/data/rateLimit'
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
import queryAllB2CProducts from '../../../../constants/db/products/queryAllB2CProducts'
//import checkAPIAuth from '../../../../utils/auth/check-api-auth'

const handler = async (req, res) => {
    //let creds, auth
    try {
        await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
        //auth = await checkAPIAuth(req, res)
        //if ( !auth || auth.error ) {
        //   return res.status(403).send({error: auth.error})
        //}
        if (req.method === 'GET') {
            const data = await db.any(queryAllB2CProducts)
            //console.log(data)
            res.status(200).json({products: data });
        } else {
            res.status(405).send({error: 'Invalid method'}) 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: ["Error in products"], error: error})
    }
}
export default handler
