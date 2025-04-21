import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};