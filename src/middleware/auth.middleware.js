import passport from "passport";
import { productService } from "../repository/index.js";

function cartMdwPremium(req, res, next){
    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
      const currentRole = userJWT.role
      const userId = userJWT._id
      const product = productService.getProductById(req.params.cid)
      const productIsFromOwner = product.owner === userId

      if (err) {
        return next(err)
      }

      if (!userJWT) {
        return res
          .status(401)
          .send({ message: "Acceso denegado. Token inválido o expirado." });
      }

      if(currentRole === 'PREMIUM' && productIsFromOwner){
        return res
        .status(401)
        .send({ message: "Acceso denegado. No puedes agregar productos que tu creaste" });
      }
      
      req.user = userJWT
      return next()
    })(req, res, next)
  }

function productMdwPremium(req, res, next){
    passport.authenticate("jwt", { session: false }, async (err, userJWT, info) => {
      const currentRole = userJWT.role
      const userId = userJWT._id
      const isUserPremiumAndAdmin = currentRole === 'PREMIUM' || currentRole === "ADMIN"
      const product = await productService.getProductById(req.params.pid)
      const productIsFromOwner = product.owner === userId

      if (err) {
        return next(err)
      }

      if (!userJWT) {
        return res
          .status(401)
          .send({ message: "Acceso denegado. Token inválido o expirado." });
      }

      if (!isUserPremiumAndAdmin){
        return res
        .status(401)
        .send({ message: "Acceso denegado. No tienes permiso" });
      }

      if(currentRole === 'PREMIUM' && !productIsFromOwner){
        return res
        .status(401)
        .send({ message: "Acceso denegado. Este producto no te pertenece" });
      }

      req.user = userJWT
      return next()
    })(req, res, next)
  }
  
function authMdw(role) {
  return (req, res, next) => {

  if (role.length === 1 && role[0] === "PUBLIC") {
    return next();
  }

  passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
    if (err) {
      return next(err)
    }
    
    if (!userJWT) {
      return res
        .status(401)
        .send({ message: "Acceso denegado. Token inválido o expirado." });
    }

    const currentRole = userJWT.role
    if (!role.includes(currentRole)){
      return res
        .status(401)
        .send({ message: "Acceso prohibido." });
    }
      req.user = userJWT
      return next()
  })(req, res, next)
}}

function authMdwFront(req, res, next) {
    if (!req.signedCookies['jwt']) {
      return res.redirect("/login")
    }

    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
      if (err) {
        return next(err);
      }
      if (!userJWT) {
        return res
          .status(401)
          .send({ message: "Acceso denegado. Token inválido o expirado." });
      }
        req.user = userJWT;
        return next();
    })(req, res, next);
}

function loggedRedirect(req, res, next) {
  if (req.signedCookies['jwt']) {
    return res.redirect("/")
  }

  return next()
}
  
  export { authMdwFront,
     loggedRedirect,
     authMdw,
     productMdwPremium,
     cartMdwPremium
    }