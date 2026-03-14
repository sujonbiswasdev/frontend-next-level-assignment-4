import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ chars"),
});

// update user by admin
export const UpdateuserschemabyAdmin = z
  .object({
    role: z.string().optional(),
    status: z.string().optional(),
    email: z.string(),
  })
  .strict();

// update user
const allowedDomains = ["res.cloudinary.com", "images.pexels.com"];
export const updateUserSchema = z.object({
  name: z.string().optional(),
  image: z
    .string()
    .url("Invalid image URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return allowedDomains.includes(parsed.hostname);
        } catch {
          return false;
        }
      },
      {
        message: "Only Cloudinary and Pexels images allowed",
      },
    )
    .optional(),
  bgimage: z
    .string()
    .url("Invalid image URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return allowedDomains.includes(parsed.hostname);
        } catch {
          return false;
        }
      },
      {
        message: "Only Cloudinary and Pexels images allowed",
      },
    )
    .optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).max(15).optional(),
  isActive: z.boolean().optional(),
});
