import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod/v3";

export default function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;

    return next();
  };
}
