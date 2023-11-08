import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
  findByEmail(email: string): Promise<Organization | null>;
  findById(organizationId: string): Promise<Organization | null>;
  create(data: Prisma.OrganizationCreateInput): Promise<Omit<Organization, 'password'>>;
}