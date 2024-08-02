import { Model } from "sequelize";

export class countReport extends Model {}

export default (db, DataTypes) => {
  countReport.init( {
	
    pk_countreport: {
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

    pk_countinventory: {
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
    modelName: 'countReport',
    tableName: "t_countreport",
    timestamps: true,
    paranoid: true
  })

  return countReport;
};
