import { z } from "zod";

const UserCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  balance: z.number().int(),
  username: z.string().min(3),
});

const UserCreateOutSchema = z.object({
  id: z.number(),
  last_login: z.null(),
  is_superuser: z.boolean(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  is_staff: z.boolean(),
  is_active: z.boolean(),
  date_joined: z.string(),
  balance: z.string(),
  groups: z.array(z.unknown()),
  user_permissions: z.array(z.unknown()),
});

export default {
  "user_create": {
    path: "/users/users/",
    schema: UserCreateSchema,
    method: "POST",
    response: UserCreateOutSchema,
  },
} as const;
