import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/petsRepository";
import { OrganizationRepository } from "../repositories/organizationsRepository";
import { NotFoundError } from "../errors/NotFoundError";

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationRepository
  ) {}

  async execute({
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    environment,
    organizationId
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.organizationsRepository.findById(organizationId);

    if (!org) {
      throw new NotFoundError('Organization not found.');
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      size,
      energy_level: energyLevel,
      independency_level: independencyLevel,
      environment,
      organization_id: organizationId
    });

    return {
      pet,
    }
  }
}

interface CreatePetUseCaseRequest {
  about: string;
  age: string;
  size: string;
  energyLevel: string;
  independencyLevel: string;
  environment: string;
  organizationId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet
}