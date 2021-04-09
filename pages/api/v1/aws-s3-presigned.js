import aws from 'aws-sdk'
import rateLimit from '../../../utils/data/rateLimit'
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
import { verifyIdToken } from 'next-firebase-auth'
import initAuth from '../../../utils/initAuth'
initAuth()

const handler = async (req, res) => {
    try {
        await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
        if (!(req.headers && req.headers.authorization)) {
            return res.status(400).json({ error: 'Missing Authorization header value' })
        }
        const token = req.headers.authorization.split(' ')[1] //Bearer <token>
        console.log('token', token)
        try {
            const creds = await verifyIdToken(token)
            const { id, email } = creds
        } catch (e) {
            console.error(e)
            return res.status(403).json({ error: 'Not authorized' })
        }
        aws.config.update({
            accessKeyId: process.env.ND_AWS_ACCESS_KEY,
            secretAccessKey: process.env.ND_AWS_SECRET_KEY,
            region: process.env.ND_AWS_REGION,
            signatureVersion: 'v4',
          });
        
          const s3 = new aws.S3();
          console.log('s3 api', s3)
          const post = await s3.createPresignedPost({
            Bucket: process.env.ND_AWS_S3_BUCKET_NAME,
            Fields: {
              key: 'assets/images/'+req.query.file,
            },
            Expires: 60, // seconds
            Conditions: [
              ['content-length-range', 0, 1048576], // up to 1 MB
            ],
          });
          console.log('post', post)
          if (post) {
              console.log(post.url+'/'+post.fields.key)
          }
        
        res.status(200).json(post)
        
    } catch (error) {
        console.error(error);
        res.status(500).send({message: ["Error in processing orders"], error: error})
    }
}
export default handler