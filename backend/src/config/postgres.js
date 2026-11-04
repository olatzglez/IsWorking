import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

/*
   Instancia de Sequelize configurada con las variables de entorno.
   Utiliza PostgreSQL como dialecto y desactiva el logging de queries.

   - En producción (Render) se usa DATABASE_URL, la cadena de conexión completa.
     Si la base de datos exige SSL, poner DB_SSL=true.
   - En local (Docker) se usan DB_HOST, DB_USER, etc., como hasta ahora.
*/
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: process.env.DB_SSL === 'true'
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : {}
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false
        }
    )

export default sequelize
