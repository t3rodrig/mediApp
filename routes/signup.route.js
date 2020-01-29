const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.get("/", (req, res, next) => {
  res.render("signup");
});

router.post("/doctor", async (req, res, next) => {
  const name = req.body.inputName;
  const idCard = req.body.inputIDcard;
  const email = req.body.inputEmail;
  const password = req.body.inputPassword;
  const confirmPassword = req.body.inputConfirmPassword;

  try {
    if (name === "" || password === "" || email === "") {
      return res.render("signup", {
        message: "Todos los campos son requeridos."
      });
    }

    const emailExists = await Doctor.findOne({ email });

    if (emailExists) {
      return res.render("index", {
        message: "Este usuario ya existe."
      });
    }

    if (idCard === "") {
      return res.render("index", {
        message:
          "Es requerido validar tu profesión para registrarte como Médico"
      });
    } else {
    }

    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      await Doctor.create({ name, password: hashPass, email });
    }
  } catch {}
});

router.post("/patient", async (req, res, next) => {
  const name = req.body.inputName;
  const paternalLastName = req.body.inputPaternalLastName;
  const email = req.body.inputEmail;
  const password = req.body.inputPassword;
  const confirmPassword = req.body.inputConfirmPassword;

  try {
    if (name === "" || paternalLastName || password === "" || email === "") {
      return res.render("signup", {
        message: "Todos los campos son requeridos."
      });
    }

    const emailExists = await Patient.findOne({ email });

    if (emailExists) {
      return res.render("signup", {
        message: "Este usuario ya existe."
      });
    }

    if (password !== confirmPassword) {
      return res.render("signup", { message: "Las contraseñas no coinciden" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    await Patient.create({ name, paternalLastName, password: hashPass, email });

    const user = await Patient.findOne({ email });

    req.session.currretUser = user;

    console.log(user);
    res.render("profile", { user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;