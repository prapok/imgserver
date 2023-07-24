const express = require('express');
const jdenticon = require('jdenticon');

const app = express();
let port = process.env.get("PORT") || 8111;

app.get('/', (req, res) => {
   res.send("Example Image Server");
});

//http request(req), respsone(res) and next (middleware arg)
app.use(function (req, res, next) {

    // url allowed to access connection or http://localhost:3000
    res.setHeader('Access-Control-Allow-Origin', 'https://match-cards.herokuapp.com');

    // request method
    res.setHeader('Access-Control-Allow-Methods', 'GET');  

    // middleware function call next to throw error
    next();
});

// Example: 'GET /png/billy/300' will return a 300x300 png for the identifier 'billy'
app.get('/png/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/png')
    res.send(jdenticon.toPng(req.params.identifier, Number.parseInt(req.params.size, 10)))
});

// Example: 'GET /svg/billy/300' will return a 300x300 svg for the identifier 'billy'
app.get('/svg/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(jdenticon.toSvg(req.params.identifier, Number.parseInt(req.params.size, 10)))
});

app.get('/getGameConfig/:count', (req, res) => {
    const { count } = req.params;
    let result = [];
    for(let i = 0; i < count; i++) {
        result.push({
            url: `https://tesimg-server.herokuapp.com/svg/${ Math.ceil(Math.random() * 1000)}/170`,
            name: i
        })
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.listen(port, () => console.log(`Image server running on port ${port}`));
