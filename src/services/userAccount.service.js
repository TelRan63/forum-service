import * as userAccountRepository from '../repositories/userAccount.repository.js';

export const register = async (user) => {
    try {
        return await userAccountRepository.addUser(user);
    } catch (e) {
        console.log(e);
        throw new Error('User already exists');
    }
}

export const removeUser = async (login) => {
    const userAccount = await userAccountRepository.removeUser(login);
    if (!userAccount) {
        throw new Error(`User with login ${login} not found`);
    }
    return userAccount;
}

export const updateUser = async (login, updateData) => {
    const userAccount = await userAccountRepository.updateUser(login, updateData);
    if (!userAccount) {
        throw new Error(`User with login '${login}' not found`);
    }
    return userAccount;
}

export const changeRoles = async (login, role, isAddRole) => {
    role = role.toUpperCase();
    let userAccount;
    if (isAddRole) {
        userAccount = await userAccountRepository.addRole(login, role);
    } else {
        userAccount = await userAccountRepository.removeRole(login, role);
    }
    // TODO: Complete to implement user role change logic

}

export const changePassword = async (login, newPassword) => {
    // TODO: Implement user password change logic
}

export const getUser = async (login) => {
    const userAccount = await userAccountRepository.findUser(login);
    if (!userAccount) {
        throw new Error(`User with login '${login}' not found`);
    }
    return userAccount;
}