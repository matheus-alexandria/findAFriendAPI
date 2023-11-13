import { Pet, Prisma } from "@prisma/client";

export interface PetFilters {
  age?: string;
  size?: string;
}

export interface PetsRepository {
  getAllByFilters(filters?: PetFilters): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}