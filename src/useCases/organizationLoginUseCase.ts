import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizationsRepository";
import { compare } from 'bcryptjs';
import { NotAuthorized } from "../errors/NotAuthorizedError";

export class OrganizationLoginUseCase {
  constructor(
    private organizationsRepository: OrganizationRepository
  ) {}

  async execute({ email, password }: OrganizationLoginUseCaseRequest): Promise<OrganizationLoginUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new NotAuthorized('Wrong credentials.');
    }

    const isPasswordValid = await compare(password, organization.password);

    if (!isPasswordValid) {
      throw new NotAuthorized('Wrong credentials.');
    }

    return {
      organization,
    }
  }
}

interface OrganizationLoginUseCaseRequest {
  email: string;
  password: string;
}

interface OrganizationLoginUseCaseResponse {
  organization: Organization
}