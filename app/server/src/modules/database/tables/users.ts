import database from "@/modules/database";
import { roles, type Role } from "@/modules/database/schemas/roles";
import { rolesToUsers } from "@/modules/database/schemas/roles-to-users";
import { users, type User } from "@/modules/database/schemas/users";
import { DEFAULT_ROLE } from "@/modules/database/tables/roles";
import { generatePublicId } from "@/modules/id";
import { eq } from "drizzle-orm";

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
): Promise<User> => {
  return await database.transaction(async (tx) => {
    const role: Role | undefined = await tx.query.roles.findFirst({
      where: eq(roles.name, DEFAULT_ROLE),
    });
    if (!role) {
      throw new Error(`Default role '${DEFAULT_ROLE}' not found`);
    }
    const [user]: User[] = await tx
      .insert(users)
      .values({
        publicId: generatePublicId(),
        username,
        email,
        password: passwordHash,
      })
      .returning();
    await tx.insert(rolesToUsers).values({
      userId: user.id,
      roleId: role.id,
    });
    return user;
  });
};
