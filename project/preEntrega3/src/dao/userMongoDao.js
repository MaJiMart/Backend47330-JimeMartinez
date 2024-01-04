import UserModel from '../models/userModel.js'

export default class UserDao {
  getUsers(criteria = {}) {
    return UserModel.find(criteria);
  }

  createUser(data) {
    return UserModel.create(data);
  }

  updateUser(uid, data) {
    return UserModel.updateOne({ _id: uid }, { $set: data });
  }

  deleteUser(uid) {
    return UserModel.deleteOne({ _id: uid });
  }
}