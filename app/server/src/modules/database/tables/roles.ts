import database from "@/modules/database";
import { roles, type Role } from "@/modules/database/schemas/roles";
import { generatePublicId } from "@/modules/id";
import { eq } from "drizzle-orm";

export const DEFAULT_ROLE = "user";

export const createRole = async (name: string): Promise<Role> => {
  const [role]: Role[] = await database
    .insert(roles)
    .values({
      publicId: generatePublicId(),
      name,
    })
    .returning();
  return role;
};

export const getRole = async (name: string): Promise<Role | undefined> => {
  const role: Role | undefined = await database.query.roles.findFirst({
    where: eq(roles.name, name),
  });
  return role;
};
