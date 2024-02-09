import { expect } from 'chai';
import supetest from 'supertest';

const requester = supetest('http://localhost:8080');

describe('Ecommerce test', () => {
  xdescribe('Authentication test', () => {
    let cookie;

    it('Should register a user successfully', async function(){
      const userMock = {
        first_name: 'Super',
        last_name: 'Test',
        email: 'supertest@mail.com',
        password: '9876',
        role: 'admin'
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/auth/register').send(userMock);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message', 'Successfully registered user')
    });
    
    it('Should loguear a user successfully', async function(){
      const credentialMock = {
        email: 'supertest@mail.com',
        password: '9876'
      };
      const {
        headers,
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/auth/login').send(credentialMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('status', 'success');
      const [key, value] = headers['set-cookie'][0].split('=');
      cookie = { key, value };
    });

    it('Should get the user logged in successfully', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get('/current').set('Cookie', [`${cookie.key}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('email', 'supertest@mail.com')
    });
  })

  xdescribe('Product test', () => {
    /* let pid; //Cuando funcione el test para crear se podrá habilitar la variable*/

    it('Should get all products correctly', async function(){
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get('/api/products')
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok
      expect(_body).to.be.an('array')
    });

    it('Should create a successful product', async function(){
      const prodMock = {
        title: 'Sponges',
        description: 'Supertest sponges',
        code: 'SUP987',
        price: 98,
        stock: 50
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/products').send(prodMock);
      expect(statusCode).to.be.equal(201);
      expect(ok).to.be.ok;
      expect(_body).to.be.an('object')
      pid = _body._id
    });

    it('Should get a product by its ID successfully', async function(){
      const pid = '65b8dedd0178a7db5313d443'; //cuando funcione el test de crear se podrá eliminar esta constante
      const {
        statusCode,
        ok,
        _body,
      } = await requester.get(`/api/products/${pid}`)
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok
      expect(_body).to.be.an('object')
      expect(_body._id).to.be.equal(pid)
    });

    it('Should update a product successfully', async function(){
      const pid = '65b8dedd0178a7db5313d443'; //cuando funcione el test de crear se podrá eliminar esta constante
      const updateProd = {
        category: "Gift"
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.put(`/api/products/${pid}`).send(updateProd);
      expect(statusCode).to.be.equal(20);
      expect(ok).to.be.ok;
      expect(_body).to.be.an('object')
    });

    it('Should delete a product successfully', async function(){
      const pid = '65b8dedd0178a7db5313d443'; //cuando funcione el test de crear se podrá eliminar esta constante
      const {
        statusCode,
        ok,
        _body,
      } = await requester.put(`/api/products/${pid}`);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('message', 'Product successfully removed')
    });
  });

  xdescribe('Carts test', () => {

  })
})