import {z} from 'zod';

export const freelancerAccountSchema = z.object({
    firstname: z.string().min(2,{message:'Must be minmum length of 2 characters'}).max(30, {message:'Max length of 30 characters'}),
    lastname: z.string().min(2,{message:'Must be minmum length of 2 characters'}).max(30, {message:'Max length of 30 characters'}),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:'Must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character.',}),
    country: z.string().min(1,{message:'You must choose a country'}),
    isCheckedTerms: z.boolean()
});

