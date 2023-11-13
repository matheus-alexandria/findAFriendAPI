import { Pet, Prisma } from "@prisma/client";
import { PetFilters, PetsRepository } from "../petsRepository";
import { prisma } from "../../lib/prisma";

export class PetsPrismaRepository implements PetsRepository {
  async getAllByFilters(filters?: PetFilters): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: filters
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