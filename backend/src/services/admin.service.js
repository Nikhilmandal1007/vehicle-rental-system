import {
    getPendingHostsModel,
    approveHostModel,
    rejectHostModel
}
from "../models/admin.model.js";



export const getPendingHosts = async()=>{

    return await getPendingHostsModel();

};



export const approveHost = async(hostId)=>{

    return await approveHostModel(hostId);

};



export const rejectHost = async(hostId)=>{

    return await rejectHostModel(hostId);

};