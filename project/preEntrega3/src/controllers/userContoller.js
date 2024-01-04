import UserService from '../services/userService.js';
import { NotFound } from '../utilities.js';

export default class UserController {
   static async getUsers(query = {}) {
    /* const filter = {
      uid: query._id,
    } */
    return await UserService.getUsers(query);
  }

  static async createUser(data) {
    const user = await UserService.createUser(data);
    console.log('Successfully created user');
    return user;
  }

  static async getById(uid) {
    let user = await UserService.getUsers({ _id: uid })
    if (!user) {
      throw new NotFound(`The user with id ${uid}was not found`);
    }
    return user;
  }

  static async updateUser(uid, data) {
    await UserController.getById(uid);
    await UserService.updateUser(uid, data);
    console.log('Successfully updated user');
  }

  static async deleteUser(uid) {
    await UserController.getById(uid);
    await UserService.deleteUser(uid);
    console.log('Successfully deleted user');
  }
}