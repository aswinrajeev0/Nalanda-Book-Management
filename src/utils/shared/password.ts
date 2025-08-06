import bcrypt from "bcryptjs"

const SALT_ROUND = process.env.SALT_ROUND || 10

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUND)
}

export const comparePassword = async(password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}