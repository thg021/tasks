import { db } from "@/lib/db.prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (err) {
    console.error("Error fetching user by email", err);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (err) {
    console.error("Error fetching user by id", err);
    return null;
  }
};
