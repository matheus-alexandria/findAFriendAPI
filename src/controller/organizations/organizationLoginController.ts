import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrganizationsPrismaRepository } from "../../repositories/prisma/organizationsPrismaRepository";
import { OrganizationLoginUseCase } from "../../useCases/organizationLoginUseCase";

export class OrganizationLoginController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const loginRequestSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = loginRequestSchema.parse(req.body);

    const organizationRepository = new OrganizationsPrismaRepository();
    const organizationLogin = new OrganizationLoginUseCase(organizationRepository);

    const { organization } = await organizationLogin.execute({ email, password });

    const token = res.jwtSign({}, {
      sub: organization.id
    });

    return res.send({
      token
    });
  }
}