import { perform } from "@/utils/client";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ExtractData<T, K extends string> = T extends { [key in K]: infer V }
  ? UnwrapPromise<V>
  : never;
type AllKeys<T> = T extends T ? keyof T : never;
export type ExtractFrom<
  P extends Parameters<typeof perform>[0],
  K extends Extract<
    AllKeys<UnwrapPromise<ReturnType<typeof perform<P>>>>,
    string
  >,
> = ExtractData<UnwrapPromise<ReturnType<typeof perform<P>>>, K>;
