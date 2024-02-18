import bcrypt from 'bcrypt'

export const matchPassword = async (password: string, existingPassword: string) => {
    await bcrypt.compare(password, existingPassword);
}