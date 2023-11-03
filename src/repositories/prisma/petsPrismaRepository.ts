import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { prisma } from "../../lib/prisma";

export class PetsPrismaRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}