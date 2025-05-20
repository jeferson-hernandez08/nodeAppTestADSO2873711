const db = require('../models');

const getAllUsers = async () => {
    try {
        const allUsers = await db.User.findAll();
        return allUsers;
    } catch (error) {
        throw new error(`Error al traer los usuarios ${error.meessage}`); 
    }    
};

// Ruta getOneUser
const getOneUser = async (id) => {
    try {
        const user = await db.User.findByPk(id);
        return user;
    } catch (error) {
        throw new error(`Error al traer el usuario ${error.message}`); 
    }    
}

// Ruta createUser
const createUser = async (name, email, password) => { 
    try {
        const newUser = await db.User.create({ name, email, password });
        return newUser;
    } catch (error) {
        throw new Error(`Error al crear el usuario ${error.message}`);
    }
}

// Ruta updateUser
const updateUser = async (id, name, email, password) => { 
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario ${error.message}`);
    }
}

// Ruta deleteUser
const deleteUser = async (id) => { 
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error(`Error al eliminar el usuario ${error.message}`);
    }
}

module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser };   // Exportamos las funciones para que puedan ser utilizadas en otros archivos};