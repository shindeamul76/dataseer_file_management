

import { z } from "zod";

export const _UserModel = z.object({
  id: z.number().int(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});
