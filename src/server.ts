import Fastify from "fastify";
import sequelize from "./config/database";
import dotenv from "dotenv";


dotenv.config();

const app = Fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected");

        await sequelize.sync({alter:true});
        console.log("Table created");


        await app.listen({
            port: PORT,
        });

        console.log(`Server Running on Port http://localhost:${PORT}`);

    } catch (error) {
        console.error(error);
    }
};

start();