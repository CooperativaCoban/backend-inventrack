import { response, request } from "express";
import { Op } from "sequelize";
import { Post} from "../models/Post.js";

const postGet = async (req = request, res = response) => {
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
    const posts = await Post.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_post: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        post: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        comment: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_post", "post",
      "comment",
      
      ],
    });

    const count = await Post.count(
      {
        where: {
          pk_post: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          post: {
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
      posts, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado", error });
  }
};


const postPost = async (req, res = response) => {
  //const body = req.body;
  const { post, comment } = req.body;

  try {
    const posts = new Post({
        post,
        comment

    });

    //guardar paciente en la BD
    await posts.save();
    res.json({
      msg: "rol creado correctamente",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
    console.log("hola ", error);
}
};


const postPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    post,
    comment
  } = req.body;

  try {
    // Busca el post por su id
    const posts = await Post.findByPk(pk);

    if (!posts) {
      return res.status(404).json({
        msg: "No se encontró el rol.",
      });
    }


    // Actualiza la información del post con el método update

    await posts.update({
    post,
    comment
    });

    res.json({
      msg: "rol actualizado",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el rol.",
      error,
    });
  }
};

const postDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const posts = await Post.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (posts) {
      // Si se encontró el asociado, procede a eliminarlo.
      await posts.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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
  postGet,
  postPost,
  postPut,
  postDelete
};
