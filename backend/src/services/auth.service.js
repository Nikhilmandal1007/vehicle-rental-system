import {
    findUserByEmailModel,
    createUserModel
}
from "../models/user.model.js";

export const findUserByEmail = async (
    email
) => {

    return await findUserByEmailModel(
        email
    );
};

export const getUserByEmail = async (
    email
) => {

    return await findUserByEmailModel(
        email
    );
};

export const createUser = async (
    name,
    email,
    password,
    phone
) => {

    return await createUserModel(
        name,
        email,
        password,
        phone
    );
};