import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function userControllerRoutes(app: FastifyInstance) {
  app.post("/register", create);
}
