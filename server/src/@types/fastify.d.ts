import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    auithenticate: any;
  }

  interface FastifyRequest {
    user: string;
  }
}
