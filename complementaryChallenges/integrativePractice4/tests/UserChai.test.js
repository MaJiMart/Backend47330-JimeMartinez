import mongoose from 'mongoose';
import { expect } from 'chai';
import config from '../src/config.js';
import UserDao from '../src/dao/userMongoDao.js';

const dataBaseTest = config.mongodbTest

describe('Tests to the user dao module', function () {
  before(async function () {
    await mongoose.connect(dataBaseTest);
    this.userDao = new UserDao();
  });

  beforeEach(async () => {
    await mongoose.connection.collections.users.drop() // Elimina la colección de la base de datos
  });

  after(async function() {
    await mongoose.connection.close();
  });

  it('You should get the empty user list successfully', async function () {
    const result = await this.userDao.getUsers({})
    expect(result).to.be.deep.equal([])
    expect(Array.isArray(result).to.be.ok)
    /* expect(Array.isArray(result).to.be.equals(true)) otra opción de evaluar lo mismo que en la línea anterior.*/
  });

  it('Must create a user successfully.', async function() {
    const result = await this.userDao.createUser({
      first_name: 'Cat',
      last_name: 'Dog',
      email: 'catdog@mail.com',
      age: '35',
      password: '1234'
    });
    expect(result._id).to.be.ok
    /* expect(result).to.have.property('cart').to.be.an('array').that.is.empty */
    expect(result.cart).to.be.an('array').that.is.empty
  
  });
});