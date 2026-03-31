const users = [
    { id: 1, name: 'Admin', age: 32, email: 'admin@admin.com' },
    { id: 2, name: 'User', age: 25, email: 'user@email.com' },
    { id: 3, name: 'Security', age: 21, email: 'security@email.com' },
]

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const userDB = users.find((u) => u.email === user.email);

    if (!userDB) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        })
    }
    return {user: userDB}
})