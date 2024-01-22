import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT as string,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
    SECRET_JWT: process.env.SECRET_JWT as string,
    URI_MONGO: process.env.URI_MONGO as string
}

export default config