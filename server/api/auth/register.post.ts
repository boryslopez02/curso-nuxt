import { z } from "zod";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from "drizzle-orm";
import { usersTable } from '../../database/schema';
import { hashPassword } from "#imports";
  

const bodySchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6)
})

export default eventHandler(async (event) => {
    // 1. Validar body
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    // 2. Revisar si el usuario ya existe
    const {db_file_name} = useRuntimeConfig();
    const db = drizzle(db_file_name);
    
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).get();

    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: "User registered"
        });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Registrar usuario
    // const [newUser] = await db.insert(usersTable)
    //     .values({
    //         email,
    //         password: hashedPassword
    //     }).returning();

    const user: typeof usersTable.$inferInsert = {
        email,
        password: hashedPassword
    };

    await db.insert(usersTable).values(user);

    // 5. Crear sessionde usuario
    await setUserSession(event, {
        user: {
            name: email.split('@')[0],
            email,
            password,
        }
    })

    return {};
});