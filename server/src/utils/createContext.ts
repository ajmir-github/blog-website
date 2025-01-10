import { Handler, Request } from "express";
import { ZodError } from "zod";
import {
  customValidationError,
  simplifyValidationError,
} from "./simplifyZodError";

type ResponseType = { status: number; data: any };

export const Response = {
  success<Data>(data: Data) {
    return {
      status: 200,
      data,
    };
  },
  created() {
    return {
      status: 201,
      data: undefined,
    };
  },
  noContent() {
    return {
      status: 203,
      data: undefined,
    };
  },
  badInput(zError: ZodError) {
    return {
      status: 400,
      data: {
        message: zError.message,
        errors: simplifyValidationError(zError),
      },
    };
  },
  customBadInput(path: string, message: string) {
    return {
      status: 400,
      data: {
        message,
        errors: customValidationError(path, message),
      },
    };
  },
  notFound(message: string) {
    return {
      status: 404,
      data: {
        message,
      },
    };
  },
  autheticationRequired(message: string = "Please sign in first!") {
    return {
      status: 401,
      data: {
        message,
      },
    };
  },
  authorizationRequired(message: string = "You are not allowed to do so!") {
    return {
      status: 403,
      data: {
        message,
      },
    };
  },
  serverError(message: string = "Server Failed") {
    return {
      status: 500,
      data: {
        message,
      },
    };
  },
};

export default function createContext<Context extends Object>(
  contextBuilder: (request: Request) => Context
) {
  return function createHandler<ResponseData extends ResponseType>(
    apiHandler: (
      context: Context,
      request: Request
    ) => ResponseData | Promise<ResponseData>
  ): Handler {
    return async (request, response) => {
      try {
        const context = contextBuilder(request);
        const { status, data } = await apiHandler(context, request);
        response.status(status).json(data);
      } catch (error) {
        if (error instanceof Error) {
          response.status(500).json({ message: error.message });
        } else {
          const { status, data } = error as ResponseData;
          response.status(status).json(data);
        }
      }
    };
  };
}
