import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrganizationsPrismaRepository } from "../../repositories/prisma/organizationsPrismaRepository";
import { OrganizationLoginUseCase } from "../../useCases/organizationLoginUseCase";
import { NotAuthorized } from "../../errors/NotAuthorizedError";

export class OrganizationLoginController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
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
        organization,
        token
      });
    } catch(err) {
      if (err instanceof NotAuthorized) {
        return res.status(401).send({
          message: err.message
        });
      }

      throw err;
    }
  }
}