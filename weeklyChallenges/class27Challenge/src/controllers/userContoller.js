import UserService from '../services/userService.js';

export default class UserController {
  static async get(query = {}) {
    const users = await UserService.findAll(query);
    return users;
  }

  static async create(data) {
    const user = await UserService.create(data);
    console.log('Successfully created user');
    return user;
  }

  static async getById(uid) {
    const user = await UserService.getById(uid);
    if (!user) {
      throw new Error(`The user with id ${uid}was not found`);
    }
    return user;
  }

  static async updateById(uid, data) {
    await UserController.getById(uid);
    await UserService.updateById(ui, data);
    console.log('Successfully updated user');
  }

  static async deleteById(uid) {
    await UserController.getById(uid);
    await UserService.deleteById(uid);
    console.log('Successfully deleted user');
  }
}