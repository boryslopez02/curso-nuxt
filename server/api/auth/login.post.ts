import { z } from 'zod'
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { usersTable } from '../../database/schema';
import { hashPassword } from "#imports";

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
})

export default eventHandler (async (event) => {
    // 1. Validar body
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    // 2. Revisar si el usuario existe
    const {db_file_name} = useRuntimeConfig();
    const db = drizzle(db_file_name);
    
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).get();
    
    if (!existingUser) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid email or password"
        });
    }
    // console.log('existingUser: ', existingUser);
    
    // 3. Verificar contraseña
    const isPasswordValid = await verifyPassword(
        existingUser.password,
        password
    )
    // console.log('isPasswordValid: ', isPasswordValid);
    
    if (!isPasswordValid) {
        throw createError({
            status: 401,
            message: 'Bad credentials',
        })
    }

    // 5. Crear sessionde usuario
    await setUserSession(event, {
        user: {
            name: email.split('@')[0],
            email,
            password,
        }
    })

    return {
        messahe: "User logged"
    };
})