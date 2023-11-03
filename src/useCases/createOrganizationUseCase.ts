import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizationsRepository";
import { hash } from 'bcryptjs';

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

    const passwordEncrypt = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      email,
      cep,
      address,
      cellphone,
      password: passwordEncrypt
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