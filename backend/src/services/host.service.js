import {
    createHostProfileModel,
    findHostByUserIdModel
}
from "../models/host.model.js";

export const createHostProfile = async (
    userId,
    citizenshipNumber,
    licenseNumber,
    address
) => {

    return await createHostProfileModel(
        userId,
        citizenshipNumber,
        licenseNumber,
        address
    );
};

export const findHostByUserId = async (
    userId
) => {

    return await findHostByUserIdModel(
        userId
    );
};