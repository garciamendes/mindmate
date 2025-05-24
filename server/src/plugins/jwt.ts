import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { env } from "../env";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send({ message: "Unauthorized" });
      }
    }
  );
});
