import { response, request } from "express";
import { Op } from "sequelize";
import { countReport } from "../models/countReport.js";

const countReportGet = async (req = request, res = response) => {
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
    const countReports = await countReport.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
       pk_countreport: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_countreport",
        "amount_unit",
        "d_delivery",
        "pk_countinventory",
        "pk_user",
        "pk_collaborator",
        "pk_area",
        "pk_post"
      ],
    });

    const count = await countReport.count({
      where: {
       pk_countreport: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      countReports,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const countReportPost = async (req, res = response) => {
  //const body = req.body;
  const { amount_unit, d_delivery, pk_countinventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    const countReports = new countReport({
      amount_unit,
      d_delivery,
      pk_countinventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
    });

    //guardar al colaborador en la BD
    await countReports.save();
    res.json({
      msg: "producto creado correctamente",
      countReports,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const countReportPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { amount_unit, d_delivery, pk_countinventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    // Busca el rol por su id
    const _countReport = await countReport.findByPk(pk);

    if (!_countReport) {
      return res.status(404).json({
        msg: "No se encontró el producto.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await _countReport.update({
      amount_unit,
      d_delivery,
      pk_countinventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
  
    });

    res.json({
      msg: "producto actualizado",
      amount_unit: _countReport,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el producto.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const countReportDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const countReports = await countReport.findByPk(pk); // Busca al colaborador por su id utilizando el método findByPk
    if (countReports) {
      // Si se encontró al colaborador, procede a eliminarlo.
      await countReports.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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

export { countReportGet, countReportPost, countReportPut, countReportDelete };
