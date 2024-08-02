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
        allowNull: false,
	},

    category: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    d_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    amount: {
        type: DataTypes.INTEGER,
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
    modelName: 'countInventory',
    tableName: "t_countinventory",
    timestamps: true,
    paranoid: true
  })

  return countInventory;
};


