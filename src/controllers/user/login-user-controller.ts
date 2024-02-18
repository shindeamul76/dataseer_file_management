


import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { INVALID_CREDENTIALS, LOGIN_SUCCESS, USER_CREATE_SUCCESS, USER_DOES_NOT_EXISTS} from "@utils/types/user-types";
import { ApiError } from "@utils/handlers/api-error-handler";
import { matchPassword } from "@lib/match-password-lib";
import { generateToken } from "@lib/generate-token-lib";


export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const body: any = req.body


    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
              {
                email: body.email,
              },
              {
                username: body.username,
              },
            ],
          },
    })

    if (!existingUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, USER_DOES_NOT_EXISTS);
    }

  const passwordMatch = matchPassword(body.password, existingUser.password)

  if (!passwordMatch) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, INVALID_CREDENTIALS);
  }

  const token = await generateToken(existingUser.id);

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            token,
            LOGIN_SUCCESS
        )
    );
});