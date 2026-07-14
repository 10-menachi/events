import z from "zod";

const registrationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name should be at least 2 characters long")
      .max(100, "Full name should not exceed 100 characters"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email("Invalid email address")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password should not exceed 100 characters"),
    passwordConfirmation: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long")
      .max(100, "Password confirmation should not exceed 100 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
