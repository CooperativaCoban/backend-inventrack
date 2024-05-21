import { Model } from "sequelize";

export class comInventory extends Model {}

export default (db, DataTypes) => {
  comInventory.init( {
	
    pk_cominventory: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	item: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    model: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    series: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    note: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    d_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    accounting_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    unitprice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    totalprice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

},
{
    sequelize:db, 
    modelName: 'comInventory',
    tableName: "t_cominventory",
    timestamps: true,
    paranoid: true
  })

  return comInventory;
};


