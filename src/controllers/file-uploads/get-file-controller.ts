





import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { FILE_FETCHED_SUCCESSFULLY, FILE_NOT_FOUND, INVALID_ID } from "@utils/types/upload-file-types";





export const getFile = asyncHandler(async (req: Request, res: Response) => {

  const fileId = +req.params.id

  if (isNaN(fileId) || fileId <= 0) {

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        StatusCodes.BAD_REQUEST,
        null,
        INVALID_ID
      )
    );
  }


  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });


  if (!file) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(
        StatusCodes.NOT_FOUND,
        null,
        FILE_NOT_FOUND
      )
    );
  }


  res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      file,
      FILE_FETCHED_SUCCESSFULLY
    )
  );

});