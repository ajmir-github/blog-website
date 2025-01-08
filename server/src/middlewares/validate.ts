import { simplifyValidationError } from "@/utils/simplifyZodError";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export default function validate<Body, Params, Query>(validators: {
  body?: ZodSchema<Body>;
  params?: ZodSchema<Params>;
  query?: ZodSchema<Query>;
}) {
  return (
    request: Request<Params, any, Body, Query>,
    response: Response,
    next: NextFunction
  ) => {
    // Params
    if (validators.params) {
      const paramsValidation = validators.params.safeParse(request.params);
      if (!paramsValidation.success) {
        response.status(500).json({
          message: paramsValidation.error.message,
        });
        return;
      }
      request.params = paramsValidation.data;
    }

    // Query
    if (validators.query) {
      const queryValidation = validators.query.safeParse(request.query);
      if (!queryValidation.success) {
        response.status(500).json({
          message: queryValidation.error.message,
        });
        return;
      }
      request.query = queryValidation.data;
    }
    // Body
    if (validators.body) {
      const bodyValidation = validators.body.safeParse(request.body);
      if (!bodyValidation.success) {
        response
          .status(400)
          .json(simplifyValidationError(bodyValidation.error));
        return;
      }
      request.body = bodyValidation.data;
    }

    next();
  };
}
