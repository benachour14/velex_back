import vine from '@vinejs/vine'

export const clubValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    logo: vine.string().trim().maxLength(255),
    description: vine.string().trim().optional(),
    phone: vine.string().regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/),
    email: vine.string().email(),
    facebook: vine.string().regex(/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9_\-]+$/),
    twitter: vine.string().regex(/^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_\-]+$/),
  })
)
