const express = require('express');
const app = express();
const port = 3000;
const router = require('./router');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', router);

/*
*jika sudah menggunakan router, script ini tdk berfungsi
app.get('/', (req, res) => {
    res.status(200).json({smg: "mas"});
});
*/

app.listen(port, () => console.log(`running at port ${port}`));