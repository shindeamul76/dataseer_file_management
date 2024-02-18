

import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { File } from "@prisma/client";
import { FILE_FETCHED_SUCCESSFULLY, FILE_NOT_FOUND, INVALID_ID } from "@utils/types/upload-file-types";
import { schemaFileReadPublic } from "@lib/validations/file-validation";



export const listFiles = asyncHandler(async (req: Request, res: Response) => {
 
    const userId: number = +req.params.id 

    if (isNaN(userId) || userId <= 0) {
     
        return res.status(StatusCodes.BAD_REQUEST).json(
          new ApiResponse(
            StatusCodes.BAD_REQUEST,
            null,
            INVALID_ID
          )
        );
      }
  

    const userFiles: File[] = await prisma.file.findMany({
        where: {
          userId: userId, 
        },
      });


      if(!userFiles ) {
        return res.status(StatusCodes.OK).json(
            new ApiResponse(
              StatusCodes.OK,
              [],
              FILE_NOT_FOUND
            )
          );
      }

      const publicData = userFiles.map((file) => schemaFileReadPublic.parse(file));

      res.status(StatusCodes.OK).json(
        new ApiResponse(
          StatusCodes.OK,
          publicData,
          FILE_FETCHED_SUCCESSFULLY
        )
      );
  
});