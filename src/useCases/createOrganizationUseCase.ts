import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizationsRepository";

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    email,
    cep,
    address,
    cellphone,
    password
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const foundOrganization = await this.organizationsRepository.findByEmail(email);

    if (foundOrganization) {
      throw new Error('Organization already exists.');
    }

    const organization = await this.organizationsRepository.create({
      email,
      cep,
      address,
      cellphone,
      password
    });

    return {
      organization
    };
  }
}

interface CreateOrganizationUseCaseRequest {
  email: string;
  cep: string;
  address: string;
  cellphone: string;
  password: string;
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization;
}