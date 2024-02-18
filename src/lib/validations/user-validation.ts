
import { _UserModel as UserModel } from "@utils/zod/user-zod-model";
import { z } from "zod";


export const schemaUserBaseBodyParams = UserModel.pick({
    id: true,
    email: true,
    username: true,
    password: true,
}).partial();



const schemaUserEditParams = z.object({
    email: z.string().email().toLowerCase().optional(),
    username: z.string().optional(),
    password: z.string().min(6).optional(),
});

const schemaUserCreateParams = z.object({
    email: z.string().email().toLowerCase(),
    username: z.string(),
    password: z.string().min(6),
  });

  export const schemaUserEditBodyParams = schemaUserBaseBodyParams
  .merge(schemaUserEditParams)
  .omit({})
  .partial()
  .strict();

export const schemaUserCreateBodyParams = schemaUserBaseBodyParams
  .merge(schemaUserCreateParams)
  .omit({})
  .strict();


  export const schemaUserReadPublic = UserModel.pick({
    id: true,
    email: true,
    username: true,
}).partial();