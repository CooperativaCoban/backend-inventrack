import { response, request } from "express";
import { Op } from "sequelize";
import { Collaborator } from "../models/Collaborator.js";

const collaboratorGet = async (req = request, res = response) => {
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
    const collaborators = await Collaborator.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_collaborator: {
          [Op.like]: "%" + search + "%",
        },
      },
      attributes: [
        "pk_collaborator",
        "name",
        "lastname",
        "post",
        "area",
        "department",
      ],
    });

    const count = await Collaborator.count({
      where: {
        pk_collaborator: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    res.json({
      collaborators,
      cantidad: count,
      totalPaginas: Math.ceil(count / size),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const collaboratorPost = async (req, res = response) => {
  //const body = req.body;
  const { name, lastname, post, area, department} = req.body;

  try {
    const collaborators = new Collaborator({
      name,
      lastname,
      post,
      area,
      department,
    });

    //guardar al colaborador en la BD
    await collaborators.save();
    res.json({
      msg: "colaborador creado correctamente",
      collaborators,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
  }
};

const collaboratorPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const { name, lastname, post, area, department} = req.body;

  try {
    // Busca el rol por su id
    const _collaborator = await Collaborator.findByPk(pk);

    if (!_collaborator) {
      return res.status(404).json({
        msg: "No se encontró el colaborador.",
      });
    }

    // Actualiza la información del colaborador con el método update

    await _collaborator.update({
      name,
      lastname,
      post,
      area,
      department,
    });

    res.json({
      msg: "colaborador actualizado",
      name: _collaborator,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el colaborador.",
      error,
    });
    console.log("KRISHNAA", error);
  }
};

const collaboratorDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const collaborators = await Collaborator.findByPk(pk); // Busca al colaborador por su id utilizando el método findByPk
    if (collaborators) {
      // Si se encontró al colaborador, procede a eliminarlo.
      await collaborators.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: "colaborador eliminado con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró el colaborador.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar el colaborador.",
      error,
    });
  }
};

export { collaboratorGet, collaboratorPost, collaboratorPut, collaboratorDelete };
