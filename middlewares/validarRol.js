// Definimos un objeto que mapea las rutas a los roles permitidos
const rutasPermisos = {
  '/menu': [1],
  '/countInventory': [1, 2],
  '/countReport': [1, 2],
  '/comInventory': [1, 3],
  '/comReport': [1, 3],
  '/thInventory': [1, 4],
  '/thReport': [1, 4],
  '/roles': [1]
};

const validarRol = (ruta) => {
  return (req, res, next) => {
    const pk_rol_usuario = req.user.pk_role; // Accedemos al pk_role del usuario que está haciendo la petición
    
    // Verificamos si la ruta existe en nuestro objeto de permisos
    if (rutasPermisos.hasOwnProperty(ruta)) {
      // Verificamos si el rol del usuario está permitido para esta ruta
      if (rutasPermisos[ruta].includes(pk_rol_usuario)) {
        next(); // El usuario tiene permiso, continuamos con la siguiente función middleware
      } else {
        return res.status(401).json({
          msg: "No tiene los permisos para esta acción",
        });
      }
    } else if (pk_rol_usuario === 1) {
      // Si la ruta no está en el objeto de permisos, pero el usuario es rol 1, permitimos el acceso
      next();
    } else {
      // Si la ruta no está en el objeto de permisos y el usuario no es rol 1, denegamos el acceso
      return res.status(401).json({
        msg: "No tiene los permisos para esta acción",
      });
    }
  };
};

export {
  validarRol
};