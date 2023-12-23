import UserService from '../services/userService.js';
import { Exception } from '../utilities.js';

export default class UserController {
  static async getUsers(query = {}) {
    return await UserService.getUsers(query);
  }

  static async create(data) {
    const user = await UserService.create(data);
    console.log('Successfully created user');
    return user;
  }

  static async getById(uid) {
    const user = await UserService.getById(uid);
    if (!user) {
      throw new Exception(`The user with id ${uid}was not found`, 404);
    }
    return user;
  }

  static async updateById(uid, data) {
    await UserController.getById(uid);
    await UserService.updateById(uid, data);
    console.log('Successfully updated user');
  }

  static async deleteById(uid) {
    await UserController.getById(uid);
    await UserService.deleteById(uid);
    console.log('Successfully deleted user');
  }
}