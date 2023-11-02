import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organizationsRepository";
import { prisma } from "../../lib/prisma";

export class OrganizationsPrismaRepository implements OrganizationRepository {
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
    });

    return organzation;
  }
}