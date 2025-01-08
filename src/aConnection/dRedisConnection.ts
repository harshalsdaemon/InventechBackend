import Redis from 'ioredis'

// Redis connection made through internsdaemon@gmail.com
const redisClient = new Redis({
  host: 'redis-11633.c330.asia-south1-1.gce.redns.redis-cloud.com',
  port: 11633,
  password: 'upL6MJKie0vLnC8FBoRmjAT35vwWME9t'
})

const redisConnection = (client: Redis = redisClient) => {
  client.on("error", (error) => {
    console.log('Redis Client Error', error)
  })


  client.on("connect", () => {
    console.log(`Great... Redis connected on server ${client.options.host}`)
  })
}

export default redisConnection;
export { redisClient }
