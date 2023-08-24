const express = require("express");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../documentation/swagger.json");

// Auth Middleware with Passport
const jwt = require("jsonwebtoken");
const User = require("../user/user");
const secret = process.env.SECRET;
const axios = require("axios");
const flatted = require("flatted");
const fetch = require("node-fetch");

const customerLastInfo = require("../customer/customer");
const customerScheduleChapter = require("../customerSchedule/customerSchedule");
const demandLastInfo = require("../demand/demand");
const charpterInfo = require("../chapter/chapter");
module.exports = function (server) {
  // API Router
  const router = express.Router();
  server.use("/api", router);

  // Swagger Router
  const options = {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  };
  server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );

  // Registering Model Routes
  const userService = require("../user/userService");
  userService.register(router, "/user");

  // Consulta de Status do Usuário
  const userServicePT = require("../customer/customerService");
  userServicePT.register(router, "/usuario");

  // Mostra os detalhes do Capitulo
  const userScheduleServicePT = require("../customerSchedule/customerScheduleService");
  userScheduleServicePT.register(router, "/usuario/capitulos");

  const farmService = require("../farm/farmService");
  farmService.register(router, "/farm");

  const grainTypeService = require("../graintype/grainTypeService");
  grainTypeService.register(router, "/graintype");

  const productionService = require("../production/productionService");
  productionService.register(router, "/production");

  const geoDataService = require("../geodata/geodataService");
  geoDataService.register(router, "/geodata");

  const stockService = require("../stock/stockService");
  stockService.register(router, "/stock");

  const vehicleService = require("../vehicle/vehicleService");
  vehicleService.register(router, "/vehicle");

  const warehouseService = require("../warehouse/warehouseService");
  warehouseService.register(router, "/warehouse");

  const deliveryService = require("../delivery/deliveryService");
  deliveryService.register(router, "/delivery");

  const labelService = require("../label/labelService");
  labelService.register(router, "/label");

  const permissionService = require("../permission/permissionService");
  permissionService.register(router, "/permission");

  const signatureService = require("../signature/signatureService");
  signatureService.register(router, "/signature");

  const demandService = require("../demand/demandService");
  demandService.register(router, "/demand");

  const fifoService = require("../fifo/fifoService");
  fifoService.register(router, "/fifo");

  const pickingService = require("../picking/pickingService");
  pickingService.register(router, "/picking");

  const boxService = require("../boxes/boxesService");
  boxService.register(router, "/boxes");

  const packingService = require("../packing/packingService");
  packingService.register(router, "/packing");

  const regionService = require("../region/regionService");
  regionService.register(router, "/region");

  const setsService = require("../sets/setsService");
  setsService.register(router, "/sets");

  const barcodeService = require("../barcode/barcodeService");
  barcodeService.register(router, "/barcode");

  const chapterService = require("../chapter/chapterService");
  chapterService.register(router, "/chapter");

  const chapterDetailService = require("../chapterDetail/chapterDetailService");
  chapterDetailService.register(router, "/chapter/detail");

  const segregationService = require("../segregation/segregationService");
  segregationService.register(router, "/segregation");

  const outgoingService = require("../outgoing/outgoingService");
  outgoingService.register(router, "/outgoing");

  const outgoingServicePT = require("../outgoing/outgoingService");
  outgoingServicePT.register(router, "/outgoing");

  const sampleService = require("../sample/sampleService");
  sampleService.register(router, "/sample");

  const sampleServicePT = require("../sample/sampleService");
  sampleServicePT.register(router, "/amostra");

  const zebraService = require("../zebra/zebraService");
  zebraService.register(router, "/zebra");
  /**
   * This route returs the user data authenticated by eMail
   * @route GET /authenticate/user
   * @param {User.model} user.body.required - the new point
   * @group email - Operations about user
   * @param {string} email.query.required -  email
   * @operationId retrieveUserInfo
   * @produces application/json
   * @consumes application/json
   * @returns {Response.model} 200 - An array of user info
   * @returns {User.model}  default - Unexpected error
   * @headers {integer} 200.X-Rate-Limit - calls per hour allowed by the user
   * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
   * @security JWT
   */
  router.get("/authenticate/user/:email", function (req, res) {
    let sEmail = req.params.email;
    if (!sEmail) {
      return res.status(422).json({
        errors: {
          email: "is required",
        },
      });
    }
    User.findOne(
      {
        email: sEmail,
        status: { $ne: "locked" },
      },
      function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Falha na autenticação. Usuãrio não encontrado.",
          });
        } else {
          res.json(user);
        }
      }
    );
  });
  // Registering Normal Routes (Ex: signup, signin, logout, etc...)
  router.post("/signup", function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: "Por favor, informe um email e senha." });
    } else {
      const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        permissionLevel: 1,
        status: "new",
      });
      // save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({ success: false, msg: err });
        }
        res.json({ success: true, msg: "Usuário criado com sucesso." });
      });
    }
  });

  router.post("/signin", function (req, res) {
    if (!req.body.email) {
      return res.status(422).json({
        errors: {
          email: "é requerido",
        },
      });
    }

    if (!req.body.password) {
      return res.status(422).json({
        errors: {
          password: "é requerido",
        },
      });
    }

    User.findOne(
      {
        email: req.body.email,
        status: { $ne: "locked" },
      },
      function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({
            success: false,
            msg: "Falha na autenticação. Usuário não existe.",
          });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(user.toObject(), secret);
              // return the information including token as JSON
              res.json({ success: true, token: token });
            } else {
              res.status(401).send({
                success: false,
                msg: "Falha na autenticação. Senha incorreta.",
              });
            }
          });
        }
      }
    );
  });

  // Weather fo AccWeather
  router.get("/weather/:city", async function (req, res) {
    let cityid = req.params.city;
    if (!cityid) {
      return res.status(422).json({
        errors: {
          cityid: "is mandatory",
        },
      });
    }

    //const ACCWAPIKey = 'ullKCvKGCm4692Jgv3jponP8GFeQvrK2'
    const apikey = "c28bd09e";
    var resultInfo;

    let mURL =
      "https://api.hgbrasil.com/weather?format=json-cors&key=" +
      apikey +
      "&city_name=" +
      cityid +
      "&locale=pt-br";
    //console.log('End Point=>' + mURL)
    // axios.get(mURL)
    //   .then(function (response) {
    //     //resultInfo = 'Temperatura:' + response.results.temp + ' graus Celsius Condições:' + response.results.description;
    //     var resinfo = flatted.stringify(response)
    //     console.log('response  =>' + resinfo)
    //   }).catch(function (error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log('Error', error.message);
    //     }
    //   })

    try {
      const { apiRoute } = req.params;
      const apiResponse = await fetch(mURL);
      const apiResponseJson = await apiResponse.json();
      console.log(apiResponseJson);
      resultInfo =
        "Temperatura:" +
        apiResponseJson.results.temp +
        " graus Celsius Condições:" +
        apiResponseJson.results.description;
      res.send(resultInfo);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  // Consulta de Status do Usuário
  router.get("/usuario/:externalUserId/status", async function (req, res) {
    let userid = req.params.externalUserId;

    if (!userid) {
      res.json({ numeroCapituloAtual: null, statusDoCafe: null });
    } else {
      const jRet = {
        numeroCapituloAtual: 1,
        statusDoCafe:
          "01/08/2020 - Produto Oriundo da Fazenda Edio Miranda. Nas Condições de clima : Temperatura:24 graus Celsius Condições:Parcialmente nublado.\n 01/08/2020 - Coletado na Fazenda.\n 06/09/2020 - Saiu da fazenda para a Wolff. 07/09/2020 - Entrada no estoque da Wolff. ",
      };
      customerLastInfo.find(
        { _id: userid },
        function (errcustomerLastInfo, customers) {
          console.log("customers=" + JSON.stringify(customers));
          if (!errcustomerLastInfo) {
            res.json(jRet);
          } else {
            res.status(404).json({
              numeroCapituloAtual: -1,
              statusDoCafe: { Message: "Dados não encontrados" },
            });
          }
        }
      );
    }
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
