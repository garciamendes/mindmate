import { FastifyRequest, FastifyReply } from "fastify";
import { CredentialsSchema } from "../../../dtos/authenticate/credentials-dto";
import { makeAuthenticateUseCase } from "../../../factories/authenticate/make-authenticate-use-case";
import { CredentialsException } from "../../../exceptions/credentials-error";
import { ZodError } from "zod";
import { formatZodError } from "../../../exceptions/zod-errors";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = CredentialsSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: { sub: user.id },
    });

    return reply
      .status(200)
      .setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      .send();
  } catch (error) {
    if (error instanceof CredentialsException) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof ZodError)
      return reply
        .status(400)
        .send({ message: formatZodError(error as ZodError) });

    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
