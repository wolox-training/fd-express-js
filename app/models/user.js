'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM, values: ['ADMIN', 'MEMBER'], allowNull: false, defaultValue: 'MEMBER' }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
        }
      }
    }
  );
  return User;
};
