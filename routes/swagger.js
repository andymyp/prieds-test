var express = require("express");
var swaggerUi = require("swagger-ui-express");

var swaggerDocument = require("../swagger.json");

var router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
