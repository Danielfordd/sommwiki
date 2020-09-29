'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [
      r({ title:'Wine',
          abstract: 'this is an abstract of the article'}),
      r({ title:'Burgundy',
          abstract: 'this is an abstract of the article'}),
      r({ title:'Napa Valley',
          abstract: 'this is an abstract of the article'}),
      r({ title:'Blind Tasting',
          abstract: 'this is an abstract of the article'}),
      r({ title:'Court of Master Sommeliers',
          abstract: 'this is an abstract of the article'}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles');
  }
};
