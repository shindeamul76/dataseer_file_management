

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@main/config";
import prisma from "@lib/prisma";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@utils/handlers/api-response-handler";
import { AUTHENTICATION_FAILED, TOKEN_EXPIRED, TOKEN_NOT_FOUND } from "@utils/types/user-types";
import { ApiError } from "@utils/handlers/api-error-handler";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | any> => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        new ApiResponse(
          StatusCodes.UNAUTHORIZED,
          null,
          TOKEN_NOT_FOUND
        )
      );
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const decoded = await jwt.verify(token as string, JWT_SECRET as string) as JwtPayload;

      if (decoded && decoded.exp) {

        const expirationDate = new Date(decoded.exp * 1000);
        const currentDate = new Date();

        if (currentDate < expirationDate) {
          const user = await prisma.user.findFirst({
            where: {
              id: decoded.id,
            },
          });

          req.user = user;
          return next();
        }
      }
    } catch (verifyError) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, TOKEN_EXPIRED);
    }


    return res.status(StatusCodes.UNAUTHORIZED).json(
      new ApiResponse(
        StatusCodes.UNAUTHORIZED,
        null,
        AUTHENTICATION_FAILED
      )
    );
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ApiResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message
      )
    );
  }
};