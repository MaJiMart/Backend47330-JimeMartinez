import mongoose from 'mongoose';
import Assert from 'assert';
import UserDao from '../src/dao/userMongoDao.js';

const assert = Assert.strict;

describe('Tests to the user dao module', function () {
  before(async function () {
    await mongoose.connect('mongodb+srv://MaJiMart:YJbYiFYE2PehrNj3@cluster0.vxyquai.mongodb.net/tests');
    this.userDao = new UserDao();
  });

  beforeEach(async () => {
    await mongoose.connection.collections.users.drop() // Elimina la colección de la base de datos
  });

  after(async function() {
    await mongoose.connection.close();
  });

  it('Must create a user successfully.', async function () {
    const result = await this.userDao.createUser({
      first_name: 'Cat',
      last_name: 'Dog',
      email: 'catdog@mail.com',
      age: '35',
      password: '1234'
    });
    assert.ok(result._id);
    assert.strictEqual(Array.isArray(result.cart), true);
    assert.deepEqual(result.cart, [])
  });

  /* it('', async function () => {

  }); */
});
