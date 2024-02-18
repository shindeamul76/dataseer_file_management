
import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { USER_CREATE_SUCCESS, USER_EXISTS } from "@utils/types/user-types";
import { ApiError } from "@utils/handlers/api-error-handler";
import bcrypt from "bcrypt"
import { schemaUserCreateBodyParams, schemaUserReadPublic } from "@lib/validations/user-validation";


export const createUser = asyncHandler(async (req: Request, res: Response) => {

    const body: any = schemaUserCreateBodyParams.parse(req.body)


    const existingUser = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
        data: {
            ...body,
            password: hashedPassword
        }
    })

    const publicData = schemaUserReadPublic.parse(newUser)

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            USER_CREATE_SUCCESS
        )
    );
});