import { response, request } from "express";
import { Op } from "sequelize";
import { comReport } from "../models/comReport.js";

const comReportGet = async (req = request, res = response) => {
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
    const comReports = await comReport.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
       pk_comreport: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_comreport",
        "amount_unit",
        "d_delivery",
        "pk_cominventory",
        "pk_user",
        "pk_collaborator",
        "pk_area",
        "pk_post"
      ],
    });

    const count = await comReport.count({
      where: {
       pk_comreport: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      comReports,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const comReportPost = async (req, res = response) => {
  //const body = req.body;
  const { amount_unit, d_delivery, pk_cominventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    const comReports = new comReport({
      amount_unit,
      d_delivery,
      pk_cominventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
    });

    //guardar al colaborador en la BD
    await comReports.save();
    res.json({
      msg: "hoja de entrega creada correctamente",
      comReports,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const comReportPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { amount_unit, d_delivery, pk_cominventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    // Busca el rol por su id
    const _comReport = await comReport.findByPk(pk);

    if (!_comReport) {
      return res.status(404).json({
        msg: "No se encontró la hoja de entrega.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await _comReport.update({
      amount_unit,
      d_delivery,
      pk_cominventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
  
    });

    res.json({
      msg: "Hoja de entrega actualizada correctamente",
      amount_unit: _comReport,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar la hoja de entrega.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const comReportDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const comReports = await comReport.findByPk(pk); // Busca la hoja de entrega por su id utilizando el método findByPk
    if (comReports) {
      // Si se encontró la hoja, procede a eliminarlo.
      await comReports.destroy(); // Utiliza el método destroy para eliminar la hoja de la base de datos.
      res.json({
        msg: "la hoja de entrega eliminada con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró la hoja de entrega.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar la hoja de entrega.",
      error,
    });
  }
};

export { comReportGet, comReportPost, comReportPut, comReportDelete };
