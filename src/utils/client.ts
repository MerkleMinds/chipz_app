import { z } from "zod";
import schemas from "@/utils/schemas";

const API_URL = "http://192.168.1.42:8000";

export const perform = async <T extends keyof typeof schemas>(
  action: T,
  payload: z.infer<typeof schemas[T]["schema"]>,
  headers?: HeadersInit,
): Promise<{
  data?: z.infer<typeof schemas[T]["response"]>;
  error?: string;
}> => {
  const valid = schemas[action].schema.safeParse(payload);

  if (!valid.success) {
    return { error: "Invalid payload" };
  }

  const response = await fetch(`${API_URL}${schemas[action].path}`, {
    method: schemas[action].method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    return { error: response.statusText };
  }

  return { data: await response.json() };
};
