import { response, request } from "express";
import { Op } from "sequelize";
import { thInventory } from "../models/thInventory.js";

const thInventoryGet = async (req = request, res = response) => {
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
    const thInventorys = await thInventory.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_thinventory: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_thinventory",
        "product",
        "size",
        "stock",
        "gender",
        "d_date",
        "supplier",
        "unitprice",
        "totalprice"
      ],
    });

    const count = await thInventory.count({
      where: {
        pk_thinventory: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      thInventorys,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const thInventoryPost = async (req, res = response) => {
  //const body = req.body;
  const { product, size, stock, gender, d_date, supplier, unitprice, totalprice} = req.body;

  try {
    const thInventorys = new thInventory({
      product,
      size,
      stock,
      gender,
      d_date,
      supplier,
      unitprice,
      totalprice
    });

    //guardar al colaborador en la BD
    await thInventorys.save();
    res.json({
      msg: "producto creado correctamente",
      thInventorys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const thInventoryPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { product, size, stock, gender, d_date, supplier, unitprice, totalprice} = req.body;

  try {
    // Busca el rol por su id
    const _thInventory = await thInventory.findByPk(pk);

    if (!_thInventory) {
      return res.status(404).json({
        msg: "No se encontró el producto.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await _thInventory.update({
      product,
      size,
      stock,
      gender,
      d_date,
      supplier,
      unitprice,
      totalprice
    });

    res.json({
      msg: "producto actualizado",
      product: _thInventory,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el producto.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const thInventoryDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const thInventorys = await thInventory.findByPk(pk); // Busca al colaborador por su id utilizando el método findByPk
    if (thInventorys) {
      // Si se encontró al colaborador, procede a eliminarlo.
      await thInventorys.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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

export { thInventoryGet, thInventoryPost, thInventoryPut, thInventoryDelete };
