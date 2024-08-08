import { Model } from "sequelize";

export class thReport extends Model {}

export default (db, DataTypes) => {
  thReport.init( {
	
    pk_threport: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	amount_unit: {
		type: DataTypes.INTEGER,
        allowNull: true,
	},

    d_delivery: {
		type: DataTypes.DATE,
        allowNull: true,
	},

    pk_thinventory: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    pk_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    pk_collaborator: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 

    pk_area: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 

    pk_post: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
},
{
    sequelize:db, 
    modelName: 'thReport',
    tableName: "t_threport",
    timestamps: true,
    paranoid: true
  })

  return thReport;
};
