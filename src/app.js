const express = require('express');
const routerBlogPost = require('./routers/routerBlogPost');
const routerCategories = require('./routers/routerCategories');
const routerLogin = require('./routers/routerLogin');
const routerUser = require('./routers/routerUser');

const app = express();
app.use(express.json())
   .use('/login', routerLogin)
   .use('/user', routerUser)
   .use('/categories', routerCategories)
   .use('/post', routerBlogPost);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
