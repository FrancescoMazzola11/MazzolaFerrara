const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PolicyMaker = require("../models/PolicyMaker");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let existingPM;

    existingPM = await PolicyMaker.emailEsistente(email);

    if (!existingPM) {
      return next(new HttpError("Data not valid, check the data again.", 403));
    }

    let passwordValida = false;

    passwordValida = await bcrypt.compare(password, existingPM.password);
    if (!passwordValida) {
      return next(new HttpError("Data not valid, check the data again.", 403));
    }

    let token;

    token = jwt.sign({ id: existingPM.pmID, email: existingPM.mail }, "dream_secret_token");

    res.json({
        email
    })
  } catch (err) {
    return next(
        new HttpError("Athentication failed, try again later.", 500)
      );
  }
};

exports.login = login;