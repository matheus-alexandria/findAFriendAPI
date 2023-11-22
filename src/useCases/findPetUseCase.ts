import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/petsRepository";
import { NotFoundError } from "../errors/NotFoundError";

export class FindPetUseCase {
  constructor(
    private petsRepostirory: PetsRepository
  ) {}

  async execute({ petId }: FindPetUseCaseRequest): Promise<FindPetUseCaseResponse> {
    const pet = await this.petsRepostirory.findById(petId);

    if (!pet) {
      throw new NotFoundError('No pet registered with this id.')
    }

    return {
      pet
    }
  }
}

interface FindPetUseCaseRequest {
  petId: string;
}

interface FindPetUseCaseResponse {
  pet: Pet
}
