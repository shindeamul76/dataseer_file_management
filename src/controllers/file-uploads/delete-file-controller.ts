



import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { AWS_S3_BUCKET } from "@main/config";
import { s3 } from "@lib/aws-sdk-lib";
import { File } from "@prisma/client";
import { DeleteParams, FILE_DELETED_SUCCESSFULLY, FILE_NOT_FOUND, INVALID_ID } from "@utils/types/upload-file-types";


export const deleteFile = asyncHandler(async (req: Request, res: Response) => {

  const fileId: number = +req.params.id

  if (isNaN(fileId) || fileId <= 0) {

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        StatusCodes.BAD_REQUEST,
        null,
        INVALID_ID
      )
    );
  }


  const fileToDelete: File | null = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });


  if (!fileToDelete) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(
        StatusCodes.NOT_FOUND,
        null,
        FILE_NOT_FOUND
      )
    );
  }

  const deleteParams: DeleteParams = {
    Bucket: AWS_S3_BUCKET,
    Key: fileToDelete.fileName,
  };

  await s3.deleteObject(deleteParams).promise();

  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      null,
      FILE_DELETED_SUCCESSFULLY
    )
  );

});