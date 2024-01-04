//User
import UserRepository from './userRepository.js';
import UserDao from '../dao/userMongoDao.js';
//Product
import ProductRepository from './productRepository.js';
import ProductsDao from '../dao/productMongoDao.js';

//User
export const userRepository = new UserRepository(new UserDao());

//Product
export const productRepository = new ProductRepository(new ProductsDao());
