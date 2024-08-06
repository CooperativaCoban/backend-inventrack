import { Model } from "sequelize";

export class comReport extends Model {}

export default (db, DataTypes) => {
  comReport.init( {
	
    pk_comreport: {
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

    pk_cominventory: {
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
    modelName: 'comReport',
    tableName: "t_comreport",
    timestamps: true,
    paranoid: true
  })

  return comReport;
};
