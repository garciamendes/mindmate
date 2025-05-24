import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import jwtPlugin from "./plugins/jwt";
import fastifyCookie from "@fastify/cookie";
import { userControllerRoutes } from "./http/controllers/user/routes";

const app = fastify();
app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
});
app.register(jwtPlugin);

app.setNotFoundHandler((_request, reply) => {
  reply.status(404).send({ message: "Not Found" });
});

app.register(userControllerRoutes, { prefix: "api/users" });

app.ready().then(() => {
  console.log(app.printRoutes());
});

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running at ${address}`);
});
