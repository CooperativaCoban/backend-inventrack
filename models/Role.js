import { Model } from "sequelize";

export class Role extends Model {}

export default (db, DataTypes) => {
  Role.init(
    {
      pk_role: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: db,
      modelName: "role",
      tableName: "t_role",
      timestamps: true,
      paranoid: true,
    }
  );

  return Role;
};
