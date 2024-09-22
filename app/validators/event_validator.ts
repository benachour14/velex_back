import vine from '@vinejs/vine'

export const eventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).nullable(),
    description: vine.string().trim().optional().nullable(),
    location: vine.object({
      street: vine.string().nullable(),
      city: vine.string().nullable(),
      country: vine.string().nullable(),
      state: vine.string().nullable(),
      postalCode: vine.string().nullable(),
      latitude: vine.number().nullable(),
      longitude: vine.number().nullable(),
    }),
    startDate: vine.date(),
    endDate: vine.date().optional(),
    clubId: vine.number(),
  })
)
