import * as z from 'zod';

const today = new Date().toISOString().split('T')[0];

export const searchFormSchema = z.object({
  status: z.enum(['one-way', 'round-trip']),
  origin: z.string().min(1, { message: 'El origen es obligatorio' }),
  destination: z.string().min(1, { message: 'El destino es obligatorio' }),
  date: z.string().min(1, { message: 'La fecha es obligatoria' }).refine(date => date >= today, {
    message: 'La fecha no puede ser pasada',
  }),
  'return-date': z.string().optional().refine(date => {
    if (!date) return true;
    return date >= today;
  }, {
    message: "La fecha de regreso no puede ser pasada"
  }),
  passengers: z.number().min(1, { message: 'Debe haber al menos un pasajero' }),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
