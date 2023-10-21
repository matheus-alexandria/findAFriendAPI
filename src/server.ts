import fastify from "fastify";
import { env } from "./env";

const server = fastify();

server.listen(
  { 
    port: env.PORT, 
    host: '0.0.0.0' 
  }, () => {
    console.log("FindAFriend API Online")
  }
)