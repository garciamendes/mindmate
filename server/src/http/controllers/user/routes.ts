import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function userControllerRoutes(app: FastifyInstance) {
  app.post("/register", create);
  app.post("/authenticate", authenticate);
}
