const db = require('../../../../utils/data/db').instance
import rateLimit from '../../../../utils/data/rateLimit'
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
import queryAllProductCategories from '../../../../constants/db/lookups/queryAllProductCategories'
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
            const data = await db.any(queryAllProductCategories)
            //console.log(data)
            res.status(200).json({categories: data });
        } else {
            res.status(405).send({error: 'Invalid method'}) 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message: ["Error in products"], error: error})
    }
}
export default handler