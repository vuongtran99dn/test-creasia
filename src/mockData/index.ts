import {Model, createServer} from 'miragejs';
import createUserRoute from './user';
import {hashPasword} from './functions';

const startServer = createServer({
  models: {
    user: Model.extend({name: 'string'}),
  },
  routes() {
    this.urlPrefix = 'http://localhost:3000';
    createUserRoute(this);
  },
});

startServer.db.loadData({
  users: [
    {
      id: '1',
      name: 'Nguyenn Van A',
      code: '001',
      location: '2',
      gender: '1',
      dateOfBirth: '21/10/2003',
      CMND: '08976797898',
      email: '123123@gmail.com',
      dateCreated: '21/10/2005',
      phoneNumber: '1234567890',
      placeCreated: '123',

      username: '001A',
      password: hashPasword('123456'),
    },
    {
      id: '2',
      name: 'Tran Thi B',
      code: '002',
      location: '1',
      gender: '0',
      dateOfBirth: '11/03/2003',
      CMND: '123123312312',
      email: '123123@gmail.com',
      dateCreated: '21/10/2005',
      phoneNumber: '1234567890',
      placeCreated: '123',

      username: '002B',
      password: hashPasword('123123'),
    },
  ],
});

const db = startServer.db;

export default startServer;

export {db};
