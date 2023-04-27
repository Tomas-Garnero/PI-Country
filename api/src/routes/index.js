const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const country = require("./Country.js");
const activity = require("./Activity.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", country);
router.use("/activities", activity);



module.exports = router;









