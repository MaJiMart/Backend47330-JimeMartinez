import UserModel from '../models/userModel.js'

export default class UserDao {
  static getUsers(criteria = {}) {
    return UserModel.find(criteria);
  }

  static create(data) {
    return UserModel.create(data);
  }

  static getById(uid) {
    return UserModel.findById({ _id: uid });
  }

  static updateById(uid, data) {
    return UserModel.updateOne({ _id: uid }, { $set: data });
  }

  static deleteById(uid) {
    return UserModel.deleteOne({ _id: uid });
  }
}