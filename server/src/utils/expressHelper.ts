import { Handler, Request } from "express";
import { ValidationErrors } from "./simplifyZodError";

export enum ResponseStatus {
  OK = 200,
  CREATED = 201,
  BAD_INPUT = 400,
  NOT_FOUND = 404,
  AUTHETICATION_REQUIRED = 401,
  AUTHORIZARION_REQUIRED = 403,
  ERROR = 500,
}

type ResponseType =
  | {
      status: ResponseStatus.OK;
      data: any;
    }
  | {
      status: ResponseStatus.BAD_INPUT;
      message: string;
      details: ValidationErrors;
    }
  | {
      status:
        | ResponseStatus.CREATED
        | ResponseStatus.AUTHETICATION_REQUIRED
        | ResponseStatus.AUTHORIZARION_REQUIRED
        | ResponseStatus.ERROR
        | ResponseStatus.NOT_FOUND;
      message: string;
    };

export type HandlerType<Request, Response = ResponseType | null> = (
  request: Request
) => Response | Promise<Response>;

export function handle<Req extends Request>(
  ...handlers: HandlerType<Req>[]
): Handler {
  return async (request, response, next) => {
    try {
      for (const handler of handlers) {
        const res = await handler(request as Req);
        if (!res) continue;
        const { status, ...rest } = res;
        response.status(status).json(rest);
        return;
      }
      next();
    } catch (error: any) {
      response
        .status(ResponseStatus.ERROR)
        .json(error instanceof error ? { message: error.message } : error);
    }
  };
}
