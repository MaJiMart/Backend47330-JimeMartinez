import UserDao from '../dao/userDao.js';

export default class UserService {
  static findAll(filter = {}) {
    return UserDao.get(filter);
  }

  static async create(payload) {
    const user = await UserDao.create(payload);
    console.log(`Successfully created user (ID: ${user._id})`);
    return user;
  }

  static findById(uid) {
    return UserDao.getById(uid);
  }

  static updateById(uid, payload) {
    return UserDao.updateById(uid, payload);
  }

  static deleteById(uid) {
    return UserDao.deleteById(uid);
  }
}