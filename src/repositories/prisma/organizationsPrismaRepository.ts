import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organizationsRepository";
import { prisma } from "../../lib/prisma";

export class OrganizationsPrismaRepository implements OrganizationRepository {
  async findById(organizationId: string): Promise<Organization | null> {
    return prisma.organization.findUnique({ where: { id: organizationId }});
  }

  async findByEmail(email: string) {
    return prisma.organization.findUnique({
      where: {
        email
      }
    });
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organzation = await prisma.organization.create({
      data,
      select: {
        id: true,
        email: true,
        cep: true,
        address: true,
        state: true,
        cellphone: true,
        password: false
      }
    });

    return organzation;
  }
}