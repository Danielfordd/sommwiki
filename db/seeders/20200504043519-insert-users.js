'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'Demo-lition', email: 'demo@example.com', hashedPassword: createPassword(), firstName: 'Demo', lastName: 'DemoOne' }),
      r({ username: 'Yusuke', email: 'yusuke@example.com', hashedPassword: createPassword(), firstName: 'Yusuke', lastName: 'DemoTwo' }),
      r({ username: 'Peta', email: 'petra@example.com', hashedPassword: createPassword(), firstName: 'Peta', lastName: 'DemoThree' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
