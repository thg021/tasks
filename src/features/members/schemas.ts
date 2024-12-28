import { z } from 'zod';

export const createMemberSchema = z.object({
  name: z.string().trim().min(1, 'Obrigatório'),
  email: z.string().email({
    message: 'Email é obrigatório'
  }),
  projectsId: z.array(z.string()).optional()
});

export type CreateMemberSchemaProps = z.infer<typeof createMemberSchema>;

export const avatarSchema = z.object({
  faceColor: z
    .enum(['#F9C9B6', '#AC6651'], {
      required_error: 'FaceColor is required',
      invalid_type_error: "Face color must be either 'man' or 'woman'"
    })
    .transform((val) => val.toString()),
  sex: z.enum(['man', 'woman'], {
    required_error: 'Sex is required',
    invalid_type_error: "Sex must be either 'man' or 'woman'"
  }),

  earSize: z.enum(['small', 'big'], {
    required_error: 'Ear size is required',
    invalid_type_error: "Ear size must be either 'small' or 'big'"
  }),

  hairStyle: z.enum(['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'], {
    required_error: 'Hair style is required'
  }),

  hatStyle: z.enum(['beanie', 'turban', 'none'], {
    required_error: 'Hat style is required'
  }),

  eyeStyle: z.enum(['circle', 'oval', 'smile'], {
    required_error: 'Eye style is required'
  }),

  glassesStyle: z.enum(['round', 'square', 'none'], {
    required_error: 'Glasses style is required'
  }),

  noseStyle: z.enum(['short', 'long', 'round'], {
    required_error: 'Nose style is required'
  }),

  mouthStyle: z.enum(['laugh', 'smile', 'peace'], {
    required_error: 'Mouth style is required'
  }),

  shirtStyle: z.enum(['hoody', 'short', 'polo'], {
    required_error: 'Shirt style is required'
  })
});

// Type inference
export type AvatarFormData = z.infer<typeof avatarSchema>;

// Exemplo de validação de dados parciais
export const partialAvatarSchema = avatarSchema.partial();
