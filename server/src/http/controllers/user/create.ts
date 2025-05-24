import type { FastifyReply, FastifyRequest } from "fastify";
import { AlreadyExistsException } from "../../../exceptions/already-exists";
import { userCreateSchema } from "../../../dtos/user/create-dto";
import { makeCreateUseCase } from "../../../factories/user/make-create-use-case";
import { ZodError } from "zod";
import { formatZodError } from "../../../exceptions/zod-errors";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = userCreateSchema.parse(request.body);

    const createUser = makeCreateUseCase();
    await createUser.execute(data);
  } catch (error) {
    if (error instanceof AlreadyExistsException)
      return reply.status(400).send({ message: error.message });

    if (error instanceof ZodError)
      return reply
        .status(400)
        .send({ message: formatZodError(error as ZodError) });

    return reply.status(500).send({ message: "Internal Server Error" });
  }

  return reply.status(201).send();
};
