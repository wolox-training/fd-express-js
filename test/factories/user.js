let factory = require('factory-girl');
const User = require('../../app/models').user,
  adapter = new factory.SequelizeAdapter();

factory = factory.factory;

factory.setAdapter(adapter);

factory.define('user', User, {
  email: factory.seq('User.email', n => `user${n}@wolox.com`),
  firstName: factory.chance('name'),
  lastName: factory.chance('last'),
  password: factory.chance('word')
});
