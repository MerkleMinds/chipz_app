import { z } from "zod";

const clientMap = {
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
