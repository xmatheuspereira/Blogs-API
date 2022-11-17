const express = require('express');
const routerLogin = require('./routers/routerLogin');
const routerUser = require('./routers/routerUser');
// ...

const app = express();
app.use(express.json());
app.use('/login', routerLogin);
app.use('/user', routerUser);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
