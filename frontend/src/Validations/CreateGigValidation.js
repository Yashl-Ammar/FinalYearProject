import {z} from 'zod';

export const CreateGigValidationSchema = z.object({
    title: z.string().min(2,{message:'Must be more than 2 characters'}).max(80,{message:'Must not be more than 80 characters'}),
    description: z.string().min(2,{message:'Must be more than 2 characters'}).max(800,{message:'Must not be more than 800 characters'}),
});
