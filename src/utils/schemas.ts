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

const clientMap = {
  "user_create": {
    path: "/users/users/",
    schema: UserCreateSchema,
    method: "POST",
    response: UserCreateOutSchema,
  },
  "all_events": {
    path: "home",
    schema: z.any(),
    method: "GET",
    response: z.object({
      competitions: z.array(
        z.object({ region: z.string(), league: z.string(), image: z.string() }),
      ),
      featured: z.array(
        z.object({
          competition: z.string(),
          elapsed: z.number(),
          status: z.string(),
          kind: z.string(),
          left: z.object({
            team: z.string(),
            image: z.string(),
            score: z.number(),
          }),
          right: z.object({
            team: z.string(),
            image: z.string(),
            score: z.number(),
          }),
          odds: z.object({
            left: z.object({ odds: z.number(), movement: z.number() }),
            draw: z.object({ odds: z.number(), movement: z.number() }),
            right: z.object({ odds: z.number(), movement: z.number() }),
          }),
        }),
      ),
      live: z.array(
        z.object({
          competition: z.string(),
          elapsed: z.number(),
          status: z.string(),
          kind: z.string(),
          left: z.object({
            team: z.string(),
            image: z.string(),
            score: z.number(),
          }),
          right: z.object({
            team: z.string(),
            image: z.string(),
            score: z.number(),
          }),
          odds: z.object({
            left: z.object({ odds: z.number(), movement: z.number() }),
            draw: z.object({ odds: z.number(), movement: z.number() }),
            right: z.object({ odds: z.number(), movement: z.number() }),
          }),
        }),
      ),
    }),
  },
};

export default clientMap;
