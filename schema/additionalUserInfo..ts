import { z } from "zod";

export const additionalUserInfoSecondPart = z.object({
  useCase: z.enum(["WORK", "STUDY", "PERSONAL_USER"], {
    required_error: "You will need to select a notfication page.",
  }),
});

export type AdditionalUserInfoSecondPart = z.infer<
  typeof additionalUserInfoSecondPart
>;
