import { z } from 'zod'

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
})

export default eventHandler (async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    if (email === 'admin@admin.com' && password === '123123123') {
        // set the user session in the cookie
        // this server util is auto-imported by the auth-utils module
        await setUserSession(event, {
            user: {
                name: 'John Doe',
                email,
            },
        })
        return {}
    }
    throw createError({
        status: 401,
        message: 'Bad credentials',
    })
})