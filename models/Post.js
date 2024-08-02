import { Model } from "sequelize";

export class Post extends Model {}

export default (db, DataTypes) => {
  Post.init(
    {
      pk_post: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      post: {
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
      modelName: "post",
      tableName: "t_post",
      timestamps: true,
      paranoid: true,
    }
  );

  return Post;
};
