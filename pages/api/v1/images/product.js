//import db from '../../utils/data/db'
// Use a symbol to store a global instance of a connection, and to access it from the singleton.
// This fix the WARNING: Creating a duplicate database object for the same connection.
const db = require('../../../../utils/data/db').instance
import rateLimit from '../../../../utils/data/rateLimit'
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
import checkAPIAuth from '../../../../utils/auth/check-api-auth'

const handler = async (req, res) => {
    let creds, auth
    try {
        await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
        auth = await checkAPIAuth(req, res)
        if ( !auth || auth.error ) {
           return res.status(403).send({error: auth.error})
        }
        if (req.method === 'POST') {
            let productDetail = req.body
            const { email } = auth
            productDetail = {...productDetail, createdBy: email, createdAt: new Date(), updatedBy: email, updatedAt: new Date()}
            console.log(productDetail)
            const productImageId = await db.one('INSERT INTO "ProductImage"(${this:name}) VALUES(${this:csv}) returning "productId" ', productDetail, a => a.productId)
            res.status(201).json({success: true, productImageId, message: 'Created successfully.'})  
        } else if (req.method === 'PUT') {
            let productDetail = req.body.data 
            const { productImageId } = productDetail
            const { email } = req.body.creds
            productDetail = {...productDetail, updatedBy: email, updatedAt: new Date()}
            //console.log(productDetail)
            const whereClause = 'WHERE "productImageId"='+productImageId
            const data = await db.none('UPDATE "ProductImage" SET (${this:name})=(${this:csv}) '+whereClause, productDetail)
            res.status(201).json({uccess: true, message: 'Updated successfully.'})     
        } else {
            res.status(405).send({success: false, error: 'Invalid method'}) 
        }
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.status(409).send({success: false, message: error.detail, error: error})
        }
        else 
            res.status(500).send({uccess: false, message: ["Error in product images"], error: error})
    }
}
export default handler
