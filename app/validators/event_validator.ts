import vine from '@vinejs/vine'

export const eventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).nullable(),
    description: vine.string().trim().optional().nullable(),
    location: vine.object({
      city: vine.string().nullable(),
      country: vine.string().nullable(),
      state: vine.string().nullable(),
      postalCode: vine.string().nullable(),
      latitude: vine.number().nullable(),
      longitude: vine.number().nullable(),
    }),
    start_date: vine.date(),
    end_date: vine.date().optional(),
    club_id: vine.number(),
  })
)
