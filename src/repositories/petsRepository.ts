import { Pet, Prisma } from "@prisma/client";

export type PetFilters = Partial<Omit<Pet, 'id'>>;

export interface PetsRepository {
  getAllByFilters(filters?: PetFilters): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}