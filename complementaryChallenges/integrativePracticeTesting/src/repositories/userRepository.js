import UserDTO from '../dto/userDto.js';


export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers(criteria = {}) {
    const users = await this.dao.getUsers(criteria);
    return users;
  }

  async getUser(uid) {
    return await this.dao.getUser(uid)
  }

  async createUser(data) {
    return new UserDTO(await this.dao.createUser(data));
  }

  async updateUser(uid, data) {
    return new UserDTO(await this.dao.updateUser(uid, data));
  }

  async deleteUser(uid) {
    return new UserDTO(await this.dao.deleteUser(uid));
  }
}