import startServer, {db} from '..';
import {hashPasword} from '../functions';

const createUserRoute = (server: typeof startServer) => {
  server.post('api/auth', (schema, request) => {
    const {username, password} = JSON.parse(request.requestBody);
    const user = db.users.findBy({username: username});
    if (!user) {
      return {message: 'Tài khoản không tồn tại', code: 400};
    }
    if (user.password != hashPasword(password)) {
      return {message: 'Mật khẩu không đúng', code: 400};
    }
    return {token: user.id, code: 200};
  });

  server.get('api/user', (schema, request) => {
    try {
      const {Authorization} = request.requestHeaders;
      const token = Authorization.replace('Bearer ', '');
      const user = db.users.findBy({id: token});
      delete user.id;
      delete user.password;
      return {
        data: user,
        code: 200,
        message: 'Lấy thông tin người dùng thànhh công',
      };
    } catch (err) {
      return {
        error: err.message,
        code: 200,
        message: 'lỗi Api',
      };
    }
  });
  server.put('api/user', (schema, request) => {
    try {
      const {Authorization} = request.requestHeaders;
      const token = Authorization.replace('Bearer ', '');
      const user = db.users.findBy({id: token});
      const requestBody = JSON.parse(request.requestBody);
      if (requestBody.password) {
        delete requestBody.confirmPassword;
        requestBody.password = hashPasword(requestBody.password);
      }
      db.users.update({id: user.id}, requestBody);
      return {
        data: null,
        code: 200,
        message: 'Cập nhật thông tin người dùng thànhh công',
      };
    } catch (err) {
      return {
        error: err.message,
        code: 400,
        message: 'lỗi Api',
      };
    }
  });
};

export default createUserRoute;
