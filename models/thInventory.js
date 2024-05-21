import { Model } from "sequelize";

export class thInventory extends Model {}

export default (db, DataTypes) => {
  thInventory.init( {
	
    pk_thinventory: {
		type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
	},

	product: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    size: {
		type: DataTypes.STRING,
        allowNull: false,
	},

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


    gender: {
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
    modelName: 'thInventory',
    tableName: "t_thinventory",
    timestamps: true,
    paranoid: true
  })

  return thInventory;
};


