import {z} from 'zod';

export const EditGigValidationSchema = z.object({
    title: z.string().min(2,{message:'Must be more than 2 characters'}).max(80,{message:'Must not be more than 80 characters'}),
    description: z.string().min(2,{message:'Must be more than 2 characters'}).max(800,{message:'Must not be more than 800 characters'}),
    basicPrice: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Price must be greater than or equal to 1'}).lte(200000,{message:'Price must be less than or equal to 200,000'})),
    basicTime: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Time must be greater than or equal to 1'}).lte(600,{message:'Time must be less than or equal to 600'})),
    basicOffer: z.string().min(2,{message:'Must be more than 2 characters'}).max(60,{message:'Must not be more than 60 characters'}),
    basicRevisions: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Revisions must be greater than or equal to 1'}).lte(50,{message:'Revisions must be less than or equal to 50'})),
    standardPrice: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Price must be greater than or equal to 1'}).lte(200000,{message:'Price must be less than or equal to 200,000'})),
    standardTime: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Time must be greater than or equal to 1'}).lte(600,{message:'Time must be less than or equal to 600'})),
    standardOffer: z.string().min(2,{message:'Must be more than 2 characters'}).max(60,{message:'Must not be more than 60 characters'}),
    standardRevisions: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Revisions must be greater than or equal to 1'}).lte(50,{message:'Revisions must be less than or equal to 50'})),
    premiumPrice: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Price must be greater than or equal to 1'}).lte(200000,{message:'Price must be less than or equal to 200,000'})),
    premiumTime: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Time must be greater than or equal to 1'}).lte(600,{message:'Time must be less than or equal to 600'})),
    premiumOffer: z.string().min(2,{message:'Must be more than 2 characters'}).max(60,{message:'Must not be more than 60 characters'}),
    premiumRevisions: z.preprocess((val) => parseInt(val), z.number().gte(1,{message:'Revisions must be greater than or equal to 1'}).lte(50,{message:'Revisions must be less than or equal to 50'})),
});
