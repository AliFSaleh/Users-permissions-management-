import {cleanEnv, port, str} from 'envalid'

const validateEnv = () => {
    cleanEnv(process.env, {
        APP_PORT: port(),
        DB_TYPE: str(),
        POSTGRES_HOST: str(),
        POSTGRES_PORT: port(),
        DB_NAME: str(),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
    })
}

export default validateEnv