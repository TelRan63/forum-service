import UserAccount from '../models/userAccount.model.js';

export const addUser = async (user) => UserAccount.create(user);