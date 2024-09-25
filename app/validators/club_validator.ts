import vine from '@vinejs/vine'

export const clubValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    logo: vine.string().trim().maxLength(255).optional(),
    description: vine.string().trim().optional(),
    location: vine.object({
      country: vine.string().optional(),
      state: vine.string().optional(),
      street: vine.string().optional(),
      address: vine.string().optional(),
      postalCode: vine.string().optional(),
      latitude: vine.string().optional(),
      longitude: vine.string().optional(),
    }),
    phone: vine.string().regex(/^(\+|00)[0-9]{1,3}-[0-9]{1,14}$/),
    email: vine.string().email(),
    facebook: vine
      .string()
      .regex(/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9_\-]+$/)
      .optional(),
    twitter: vine
      .string()
      .regex(/^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_\-]+$/)
      .optional(),
  })
)
