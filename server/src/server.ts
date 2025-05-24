import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import jwtPlugin from "./plugins/jwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify();
app.register(fastifyCors, {
  origin: env.ALLOW_CORS,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
});

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
});
app.register(jwtPlugin);
