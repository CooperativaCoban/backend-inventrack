import { response, request } from "express";
import { Op } from "sequelize";
import { Area } from "../models/Area.js";

const areaGet = async (req = request, res = response) => {
  let { search, pagina = 1, limite = 50 } = req.query;

  const pageAsNumber = Number.parseInt(pagina);
  const limitAsNumber = Number.parseInt(limite);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(limitAsNumber) && limitAsNumber > -1 ) {
    size = limitAsNumber;
  }

  if (search === undefined) {
    search = "";
  } else {
    search = search.trim();
  }

  try {
    const areas = await Area.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_area: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        area: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        comment: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_area", "area",
      "comment",
      
      ],
    });

    const count = await Area.count(
      {
        where: {
          pk_area: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          area: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          comment: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )
    res.json({
      areas, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const areaPost = async (req, res = response) => {
  //const body = req.body;
  const { area, comment } = req.body;

  try {
    const areas = new Area({
        area,
        comment

    });

    //guardar paciente en la BD
    await areas.save();
    res.json({
      msg: "rol creado correctamente",
      areas,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
}
};


const areaPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    area,
    comment
  } = req.body;

  try {
    // Busca el area por su id
    const areas = await Area.findByPk(pk);

    if (!areas) {
      return res.status(404).json({
        msg: "No se encontró el rol.",
      });
    }


    // Actualiza la información del area con el método update

    await areas.update({
    area,
    comment
    });

    res.json({
      msg: "rol actualizado",
      areas,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el rol.",
      error,
    });
  }
};

const areaDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const areas = await Area.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (areas) {
      // Si se encontró el asociado, procede a eliminarlo.
      await areas.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: " Rol eliminado con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró el rol.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar el rol.",
      error,
    });
  }
};

export {
  areaGet,
  areaPost,
  areaPut,
  areaDelete
};
