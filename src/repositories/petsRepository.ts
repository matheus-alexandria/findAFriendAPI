import { Pet, Prisma } from "@prisma/client";

export type PetFilters = Partial<Omit<Pet, 'id'>>;

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findManyByState(state: string): Promise<Pet[]>;
  getAllByFilters(filters?: PetFilters): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}