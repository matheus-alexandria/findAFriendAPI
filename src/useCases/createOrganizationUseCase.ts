import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organizationsRepository";
import { hash } from 'bcryptjs';
import { brazilianStateAcronyms } from "../@types/stateAcronyms";
import { UseCaseError } from "../errors/UseCaseError";

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    email,
    cep,
    address,
    state,
    cellphone,
    password
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const foundOrganization = await this.organizationsRepository.findByEmail(email);

    if (foundOrganization) {
      throw new UseCaseError('Organization already exists.');
    }

    if (!brazilianStateAcronyms.includes(state)) {
      throw new UseCaseError('Not a valid state acronym to save at the database');
    }

    const passwordEncrypt = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      email,
      cep,
      address,
      state,
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
  state: string;
  cellphone: string;
  password: string;
}

interface CreateOrganizationUseCaseResponse {
  organization: Omit<Organization, 'password'>;
}