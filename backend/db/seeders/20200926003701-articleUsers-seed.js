'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('articleUsers',[
      r({userId:1, articleId:1}),
      r({userId:1, articleId:2}),
      r({userId:1, articleId:3}),
      r({userId:1, articleId:4}),
      r({userId:1, articleId:5}),
      r({userId:2, articleId:1}),
      r({userId:3, articleId:1}),
      r({userId:2, articleId:2}),
      r({userId:2, articleId:3}),
      r({userId:2, articleId:4}),
      r({userId:3, articleId:5}),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('articleUsers');
  }
};
