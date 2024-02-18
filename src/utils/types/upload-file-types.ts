import { PassThrough } from "stream";


export const FILE_UPLOADED = "File Uploaded Successfully"

export const NO_FILE_PROVIDED = "No File Provided"
export const FILE_UPLOADED_SUCCESSFULLY = "File Uploaded Successfully"
export const FILE_DELETED_SUCCESSFULLY = "Files Deleted Successfully"
export const FILE_FETCHED_SUCCESSFULLY = "Files Fetched Successfully"
export const INVALID_ID = "Invalid or Missing User ID"
export const FILE_NOT_FOUND = "File Not Found"

export type DeleteParams = {
    Bucket: string;
    Key: string;
}

export type UploadParams = DeleteParams & {
    Body: PassThrough;
    ContentType: string;
};

export type FileObject = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
};