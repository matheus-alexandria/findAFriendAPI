import { Pet, Prisma } from "@prisma/client";
import { PetFilters, PetsRepository } from "../petsRepository";
import { prisma } from "../../lib/prisma";

export class PetsPrismaRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    });
    return pet;
  }

  async findMany(state: string, filters?: PetFilters): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        ...filters,
        organization: {
          state
        }
      }
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}