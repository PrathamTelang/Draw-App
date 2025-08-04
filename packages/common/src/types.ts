import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string(),
});

export const SignInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters long"),
});