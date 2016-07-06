import { create } from './book-remotes';

export default (Book) => {
  Book.remoteMethod('create', create);

  Book.create = (body, cb) => {
    cb(null, { myResponse: 'Toma ya' });
  };
};
