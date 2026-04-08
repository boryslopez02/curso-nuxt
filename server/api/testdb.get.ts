import { drizzle } from 'drizzle-orm/libsql';
import { usersTable } from '../database/schema';

export default eventHandler(async (event) => {
    const {db_file_name} = useRuntimeConfig();
    const db = drizzle(db_file_name);
    
    const users = await db.select().from(usersTable);

    return {users};
});