

import { _FileModel as FileModel } from "@utils/zod/file-zod-model";
import { z } from "zod";


export const schemaFileBaseBodyParams = FileModel.pick({
    id:true,
    fileType: true,
    fileUrl: true,
    fileName: true,
    userId: true,
}).partial();



const schemaFileEditParams = z.object({
    id: z.number().int(),
    fileType: z.string(),
    fileUrl: z.string(),
    fileName: z.string(),
});

const schemaFileCreateParams = z.object({
    fileType: z.string(),
    fileUrl: z.string(),
    fileName: z.string(),
    userId: z.number().int(),
  });

  export const schemaFileEditBodyParams = schemaFileBaseBodyParams
  .merge(schemaFileEditParams)
  .omit({})
  .partial()
  .strict();

export const schemaFileCreateBodyParams = schemaFileBaseBodyParams
  .merge(schemaFileCreateParams)
  .omit({})
  .strict();


  export const schemaFileReadPublic = FileModel.pick({
    id:true,
    fileUrl: true,
    fileName: true,
}).partial();