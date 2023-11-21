import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import { OrganizationsPrismaRepository } from "../../repositories/prisma/organizationsPrismaRepository";
import { CreateOrganizationUseCase } from "../../useCases/createOrganizationUseCase";

export class CreateOrganizationController {
  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createOrgRequestSchema = z.object({
        email: z.string().email(),
        cep: z.string().max(8).min(8),
        address: z.string().refine((value) => value.split("-").length > 1 ),
        cellphone: z.string().regex(/^\+\d{1,4}\d{1,14}$/),
        password: z.string().min(6),
      });
  
      const {
        email,
        cep,
        address,
        cellphone,
        password
      } = createOrgRequestSchema.parse(request.body);

      const state = address.split('-').pop()?.trim();
  
      const organizationsPrismaRepository = new OrganizationsPrismaRepository();
      const createOrganizationUseCase = new CreateOrganizationUseCase(organizationsPrismaRepository);
  
      const { organization } = await createOrganizationUseCase.execute({
        email,
        cep,
        address,
        state: state ?? "",
        cellphone,
        password
      });
  
      const token = await response.jwtSign({}, {
        sub: organization.id
      });
  
      return response.send({
        token,
        organization
      });
    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).send({
          message: err.message
        });
      }

      throw err;
    }
  }
}