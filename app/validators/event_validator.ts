import vine from '@vinejs/vine'

export const eventValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).nullable(),
    description: vine.string().trim().optional().nullable(),
    location: vine.string().trim().maxLength(255).nullable(),
    start_date: vine.date(),
    end_date: vine.date().optional(),
    club_id: vine.string(),
  })
)
