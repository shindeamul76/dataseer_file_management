

import { z } from "zod";

export const _FileModel = z.object({
    id: z.number().int(),
    fileType: z.string(),
    fileUrl: z.string(),
    fileName: z.string(),
    userId: z.number().int(),
});
