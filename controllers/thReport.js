import { response, request } from "express";
import { Op } from "sequelize";
import { thReport } from "../models/thReport.js";

const thReportGet = async (req = request, res = response) => {
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
    const thReports = await thReport.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
       pk_threport: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_threport",
        "amount_unit",
        "d_delivery",
        "pk_thinventory",
        "pk_user",
        "pk_collaborator",
        "pk_area",
        "pk_post"
      ],
    });

    const count = await thReport.count({
      where: {
       pk_threport: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      thReports,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const thReportPost = async (req, res = response) => {
  //const body = req.body;
  const { amount_unit, d_delivery, pk_thinventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    const thReports = new thReport({
      amount_unit,
      d_delivery,
      pk_thinventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
    });

    //guardar la hoja de entrega en la BD
    await thReports.save();
    res.json({
      msg: "Hoja de entrega creada correctamente",
      thReports,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const thReportPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { amount_unit, d_delivery, pk_thinventory, pk_user, pk_collaborator, pk_area, pk_post} = req.body;

  try {
    // Busca el rol por su id
    const _thReport = await thReport.findByPk(pk);

    if (!_thReport) {
      return res.status(404).json({
        msg: "No se encontro la hoja de entrega.",
      });
    }

    // Actualiza la información de la hoja de entrega con el método update

    await _thReport.update({
      amount_unit,
      d_delivery,
      pk_thinventory,
      pk_user,
      pk_collaborator,
      pk_area,
      pk_post
  
    });

    res.json({
      msg: "hoja de entrega actualizada",
      amount_unit: _thReport,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar la hoja de entrega.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const thReportDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const thReports = await thReport.findByPk(pk); // Busca la hoja de entrega por su id utilizando el método findByPk
    if (thReports) {
      // Si se encontró la hoja de entrega, procede a eliminarlo.
      await thReports.destroy(); // Utiliza el método destroy para eliminar la hoja de entrega de la base de datos.
      res.json({
        msg: "Hoja de entrega eliminada exitosamente.", // Si funciona, sale el mensaje
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

export { thReportGet, thReportPost, thReportPut, thReportDelete };
