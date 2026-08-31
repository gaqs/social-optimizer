// src/types/global.d.ts
export {};

declare global {
  type ActionResponse<T = Record<string, unknown>> = {
    id?: string;
    success: boolean;
    message?: string;
    errors?: {
      [K in keyof T]?: string[];
    };
    inputs?: {
      [K in keyof T]?: string;
    };
  };
}