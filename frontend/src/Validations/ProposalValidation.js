import {z} from 'zod';


export const ProposalValidationSchema = z.object({
    bid: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'bid must be greater than or equal to 1'}).lte(200000,{message:'bid must be less than or equal to 200,000'})),
    duration: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Time must be greater than or equal to 1'}).lte(600,{message:'Time must be less than or equal to 600'})),
    revision: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Revisions must be greater than or equal to 1'}).lte(50,{message:'Revisions must be less than or equal to 50'})),
    letter: z.string().min(2,{message:'Must be more than 2 characters'}).max(800,{message:'Must not be more than 800 characters'}),
});
