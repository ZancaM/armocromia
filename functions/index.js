const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const API = require('./middleware/apikeys');

const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');
const userController = require('./controller/user.controller');
const proxyService = require('./service/proxy.service');

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  res.header("Access-Control-Allow-Methods", "*");
  // To add in case you need cache
  // res.header('Cache-Control', 'public, max-age=604800, s-maxage=604800');
  res.header('Content-Type', 'application/json');
  next();
});
router.post('/season', API.validateKey, proxyService.getSeason);
app.use('/user', userController);
app.use('/', router);


exports.armocromiaApp = functions.https.onRequest(app);
