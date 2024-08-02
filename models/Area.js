import { Model } from "sequelize";

export class Area extends Model {}

export default (db, DataTypes) => {
  Area.init(
    {
      pk_area: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      area: {
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
      modelName: "area",
      tableName: "t_area",
      timestamps: true,
      paranoid: true,
    }
  );

  return Area;
};
