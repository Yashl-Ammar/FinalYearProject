import {z} from 'zod';

export const PostJobValidationSchema = z.object({
    title: z.string().min(2,{message:'Must be more than 2 characters'}).max(60,{message:'Must not be more than 60 characters'}),
    description: z.string().min(2,{message:'Must be more than 2 characters'}).max(500,{message:'Must not be more than 500 characters'}),
    amount:z.preprocess((val) =>parseInt(val), z.number().gte(1,{message:'Amount must be greater than or equal to 1'}).lte(20000,{message:'Ammount must be less than or equal to 20,000'})) ,
    difficulty:z.string(),
    location:z.string(),
    category:z.string()
});
