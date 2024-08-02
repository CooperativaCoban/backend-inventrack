import { response, request } from "express";
import { Op } from "sequelize";
import { countInventory } from "../models/countInventory.js";

const countInventoryGet = async (req = request, res = response) => {
  let { search, pagina = 1, limite = 5 } = req.query;

  const pageAsNumber = Number.parseInt(pagina);
  const limitAsNumber = Number.parseInt(limite);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0 && limitAsNumber < 6) {
    size = limitAsNumber;
  }

  if (search === undefined) {
    search = "";
  } else {
    search = search.trim();
  }

  try {
    const countInventorys = await countInventory.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_countinventory: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        product: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        category: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        supplier: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        d_date: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        amount: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        unitprice: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        totalprice: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_countinventory",
        "product",
        "category",
        "supplier",
        "d_date",
        "amount",
        "unitprice",
        "totalprice"
      ],
    });

    const count = await countInventory.count({
      where: {
        pk_countinventory: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        product: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        category: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        supplier: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        d_date: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        amount: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        unitprice: {
          [Op.like]: "%" + search + "%",
        },
      },
      where: {
        totalprice: {
          [Op.like]: "%" + search + "%",
        },
      },
    }
  );
    res.json({
      countInventorys,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const countInventoryPost = async (req, res = response) => {
  //const body = req.body;
  const { product, category, supplier, d_date, amount, unitprice, totalprice} = req.body;

  try {
    const countInventorys = new countInventory({
      product,
      category,
      supplier,
      d_date,
      amount,
      unitprice,
      totalprice
    });

    //guardar al colaborador en la BD
    await countInventorys.save();
    res.json({
      msg: "producto creado correctamente",
      countInventorys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const countInventoryPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { product, category, supplier, d_date, amount, unitprice, totalprice} = req.body;

  try {
    // Busca el rol por su id
    const countInventorys = await countInventory.findByPk(pk);

    if (!countInventorys) {
      return res.status(404).json({
        msg: "No se encontró el producto.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await countInventorys.update({
      product,
      category,
      supplier,
      d_date,
      amount,
      unitprice,
      totalprice
    });

    res.json({
      msg: "producto actualizado",
      product: countInventorys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el producto.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const countInventoryDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const countInventorys = await countInventory.findByPk(pk); // Busca al colaborador por su id utilizando el método findByPk
    if (countInventorys) {
      // Si se encontró al colaborador, procede a eliminarlo.
      await countInventorys.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: "producto eliminado con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró el producto.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar el producto.",
      error,
    });
  }
};

export { countInventoryGet, countInventoryPost, countInventoryPut, countInventoryDelete };
