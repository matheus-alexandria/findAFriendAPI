import fastify from "fastify";
import { env } from "./env";
import { routes } from "./routes/index.routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

const server = fastify();

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d'
  }
});

server.register(routes);


server.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: 'Zod validation error.',
      detail: error.format()
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  }

  return response.status(500).send({ message: 'Internal server error.'});
});

server.listen(
  { 
    port: env.PORT, 
    host: '0.0.0.0' 
  }, () => {
    console.log(`FindAFriend API Online on port ${env.PORT}`)
  }
)