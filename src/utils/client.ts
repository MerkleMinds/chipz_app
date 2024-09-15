import { z } from "zod";
import schemas from "@/utils/schemas";

const API_URL = "/api/";

export const perform = async <T extends keyof typeof schemas>(
  action: T,
  payload?: z.infer<typeof schemas[T]["schema"]>,
  headers?: HeadersInit,
): Promise<
  {
    data: z.infer<typeof schemas[T]["response"]>;
  } | { error: string }
> => {
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

export const populate = <T>(
  setter: React.Dispatch<React.SetStateAction<T | null>>,
) =>
// deno-lint-ignore no-explicit-any
(data: any) => "error" in data ? setter(null) : setter(data.data);
