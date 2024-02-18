import { s3 } from "@lib/aws-sdk-lib";
import { ApiResponse } from "@utils/handlers/api-response-handler";
import { asyncHandler } from "@utils/handlers/async-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "@lib/prisma"
import { PassThrough } from 'stream';
import { FILE_UPLOADED_SUCCESSFULLY, FileObject, NO_FILE_PROVIDED, UploadParams } from "@utils/types/upload-file-types";
import { AWS_S3_BUCKET } from "@main/config";
import { INTERNAL_SERVER_ERROR } from "@utils/types/common-types";
import { File } from "@prisma/client";
import logger from "@lib/winston";
import { schemaFileCreateBodyParams } from "@lib/validations/file-validation";


export const uploadFile = asyncHandler(async (req: Request, res: Response) => {

  const file: FileObject | undefined = req.file;
  const userId = req.user.id


  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        StatusCodes.BAD_REQUEST,
        null,
        NO_FILE_PROVIDED
      )
    );
  }


  const fileName: string = file.originalname;
  let fileUrl:string[];

  const fileStream: PassThrough = new PassThrough();
  fileStream.end(file.buffer);


  const params: UploadParams = {
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
    Body: fileStream,
    ContentType: file.mimetype,
  };


  const uploadFilePromise = () => {
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          logger.error('Error uploading data: ', err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  try {
    await uploadFilePromise();

    const url: string = s3.getSignedUrl('getObject', {
      Bucket: AWS_S3_BUCKET,
      Key: fileName,
      Expires: 3600,
    });

    fileUrl = url.split('?');
 
  } catch (error) {
    logger.error('Error uploading data: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ApiResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        INTERNAL_SERVER_ERROR
      )
    );
  }

  const validateData = schemaFileCreateBodyParams.parse({
    fileType: file.mimetype,
    fileUrl: fileUrl[0],
    fileName: fileName,
    userId: userId, 
  })

  const newFile: File = await prisma.file.create({
    data: {
    ...validateData
    },
  });

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(
      StatusCodes.CREATED,
      newFile,
      FILE_UPLOADED_SUCCESSFULLY
    )
  );
});