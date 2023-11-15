import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/petsRepository";

export class GetAllPetsUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute({ 
    age, size, energyLevel, environment, independencyLevel 
  }: GetAllPetsUseCaseRequest): Promise<GetAllPetsUseCaseResponse> {
    const pets = await this.petsRepository.getAllByFilters({
      age,
      size,
      energy_level: energyLevel,
      environment,
      independency_level: independencyLevel
    });

    if (!pets.length) {
      throw new Error('No pets found with the given filters.')
    }

    return {
      pets
    }
  }
}

interface GetAllPetsUseCaseRequest {
  age?: string;
  size?: string;
  energyLevel?: string;
  independencyLevel?: string;
  environment?: string;
}

interface GetAllPetsUseCaseResponse {
  pets: Pet[];
}