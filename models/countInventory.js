import { Model } from "sequelize";

export class countInventory extends Model {}

export default (db, DataTypes) => {
  countInventory.init( {
	
    pk_countinventory: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	product: {
		type: DataTypes.STRING,
        allowNull: true,
	},

    category: {
		type: DataTypes.STRING,
        allowNull: true,
	},

    supplier: {
        type: DataTypes.STRING,
        allowNull: true,
    },


    d_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    unitprice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },

    totalprice: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },

},
{
    sequelize:db, 
    modelName: 'countInventory',
    tableName: "t_countinventory",
    timestamps: true,
    paranoid: true
  })

  return countInventory;
};


