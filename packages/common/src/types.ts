import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string(),
  name: z.string(),
});

export const SignInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters long"),
});