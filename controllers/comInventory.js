import { response, request } from "express";
import { Op } from "sequelize";
import { comInventory } from "../models/comInventory.js";

const comInventoryGet = async (req = request, res = response) => {
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
    const comInventorys = await comInventory.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_cominventory: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_cominventory",
        "item",
        "model",
        "series",
        "stock",
        "note",
        "d_date",
        "supplier",
        "accounting_code",
        "unitprice",
        "totalprice"
       
      ],
    });

    const count = await comInventory.count({
      where: {
        pk_cominventory: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      comInventorys,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const comInventoryPost = async (req, res = response) => {
  //const body = req.body;
  const { item, model, series, stock, note, d_date, supplier, accounting_code, unitprice, totalprice} = req.body;

  try {
    const comInventorys = new comInventory({
      item,
      model,
      series,
      stock,
      note,
      d_date,
      supplier,
      accounting_code,
      unitprice,
      totalprice
    });

    //guardar al colaborador en la BD
    await comInventorys.save();
    res.json({
      msg: "producto creado correctamente",
      comInventorys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const comInventoryPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { item, model, series, stock, note, d_date, supplier, accounting_code, unitprice, totalprice} = req.body;

  try {
    // Busca el rol por su id
    const _comInventory = await comInventory.findByPk(pk);

    if (!_comInventory) {
      return res.status(404).json({
        msg: "No se encontró el producto.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await _comInventory.update({
      item,
      model,
      series,
      stock,
      note,
      d_date,
      supplier,
      accounting_code,
      unitprice,
      totalprice
    });

    res.json({
      msg: "producto actualizado",
      item: _comInventory,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el producto.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const comInventoryDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const comInventorys = await comInventory.findByPk(pk); // Busca al colaborador por su id utilizando el método findByPk
    if (comInventorys) {
      // Si se encontró al colaborador, procede a eliminarlo.
      await comInventorys.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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

export { comInventoryGet, comInventoryPost, comInventoryPut, comInventoryDelete };
