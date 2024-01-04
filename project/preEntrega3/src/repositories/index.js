//User
import UserRepository from './userRepository.js';
import UserDao from '../dao/userMongoDao.js';


//User
export const userRepository = new UserRepository(new UserDao())