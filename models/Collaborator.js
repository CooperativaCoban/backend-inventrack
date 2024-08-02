import { Model } from "sequelize";

export class Collaborator extends Model {}

export default (db, DataTypes) => {
  Collaborator.init( {
	
    pk_collaborator: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	name: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    post: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    area: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },


},
{
    sequelize:db, 
    modelName: 'collaborator',
    tableName: "t_collaborator",
    timestamps: true,
    paranoid: true
  })

  return Collaborator;
};


