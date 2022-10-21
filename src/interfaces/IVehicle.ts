import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number()
    .min(1900, { message: 'Year must be between 1900 and 2022' })
    .max(2022, { message: 'Year must be between 1900 and 2022' }).int(),
  color: z.string().min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };