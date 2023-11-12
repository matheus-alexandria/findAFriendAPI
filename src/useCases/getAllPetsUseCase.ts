import { PetsRepository } from "../repositories/petsRepository";

export class GetAllPetsUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute() {
    return {
      pets: []
    }
  }
}