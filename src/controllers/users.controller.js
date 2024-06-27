import { JWT_SECRET, RESET_PASSWORD_KEY, RESET_EXPIRE_IN, CLIENT_URL } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";
import { userService } from "../repository/index.js";
import { transporter } from "../utils/email.js"

const secret = JWT_SECRET

const logoutUserCtrl = async(req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({
        status: "ok",
        message: 'You have logged out'
    })
}

const loginUserCookieCtrl = async(req, res) => {
    const token = jsonwebtoken.sign(JSON.stringify(req.user), secret)
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      signed: true,
      maxAge: 1000 * 60 * 30 // 30 min
    })
  
    res.status(200).json({status: "ok", message: "Ingresaste con exito"});
  }

  const currentUserCtrl = async(req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Acceso denegado. Token inválido o expirado." })
    }
      
    return res.status(200).send({ status: "ok",
                cookieJWT: req.signedCookies['jwt'],
                JWTPayload: req.user
      })
  }

  const forgotPasswordCtrl = async(req,res) => {
    const { email } = req.body
    userService.checkUserEmail(email)
    .then( user => {
      if (!user){
        return res.status(400).json({status: "error", message: "El usuario con ese correo no existe"});
      }

      let token = jsonwebtoken.sign(
        user,
        RESET_PASSWORD_KEY,
        { expiresIn: RESET_EXPIRE_IN })
  
      const data = {
        to: email,
        subject: 'Reset Account Password Link',
        html: `
        <h3>Por favor, ingresa al link para cambiar tu contrasena</h3>
        <p>${CLIENT_URL}/updatePassword/${token}"</p>
        `,
      }
      
      return userService.setResetLink(user._id, token)
      .then(user => {
        transporter.sendMail(data, function(error, body) {
          if (error) {
            return res.status(400).json({error: error.message})
          }
          return res.status(200).json({message: 'El correo fue enviado sigue las instrucciones'})
        })
      })
      .catch(err => {
        res.status(400).json({status: "error", message: err.message});
      });

    })
    .catch(err => {
      res.status(400).json({status: "error", message: err.message});
  });

  }

  const updatePasswordCtrl  = async(req,res) => {
    const token = req.params.token
    const { password } = req.body

    if (token) {
      jsonwebtoken.verify(token, RESET_PASSWORD_KEY, function(error, decodedData) {
        if (error) {
          return res.status(400).json({error: 'Token incorrecta o expirada'})
        }

      userService.changeUserPassword(token, password)
      .then(user => {
        if (!user){
          res.status(400).json({status: "error", message: "No hay usuario con esa token"})
        }
        return res.status(200).json({message: 'Tu contrasena fue guardad cambiada con exito'})
      })
      .catch(err => {
        res.status(400).json({status: "error", message: err.message});
      });

      })
    } else {
      return res.status(401).json({error: "Authentication Error"})
    }

  }

  const togglePremiumCtrl = async(req,res) => {
    userService.togglePremium(req.params.uid)
    .then(user => {
      if (user.role === "ADMIN"){
        res.status(400).json({status: "error", message: "No se puede cambiar el rol de un ADMIN"});
      }
      res.status(200).json({status: "ok", message: `El Rol fue cambiado a ${user.role} con exito `});
      })
    .catch(err => {
      res.status(400).json({status: "error", message: err.message});
    });
  }

export {
    logoutUserCtrl,
    loginUserCookieCtrl,
    currentUserCtrl,
    forgotPasswordCtrl,
    updatePasswordCtrl,
    togglePremiumCtrl
}