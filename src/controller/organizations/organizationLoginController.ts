import { FastifyReply, FastifyRequest } from "fastify";

export class OrganizationLoginController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    return res.send();
  }
}