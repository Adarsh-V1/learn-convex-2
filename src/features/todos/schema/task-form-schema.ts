import { z } from "zod"

export const taskFormSchema = z.object({
  text: z
  .string()
  .trim()
  .min(1,"Task text can't be empty")
  .max(200,"Text text is way to long")
})


export type TaskFormValues = z.infer<typeof taskFormSchema>
