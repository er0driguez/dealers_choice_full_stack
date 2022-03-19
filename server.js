const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Diver, DiveSite } = require('./db/index');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/divers', async(req, res, next) => {
    try {
        res.send(await Diver.findAll());
    }
    catch(err) {
        next(err);
    }
});

app.get('/api/divesites', async(req, res, next) => {
    try {
        res.send(await DiveSite.findAll());
    }
    catch(err) {
        next(err);
    }
});

const setup = async() => {
    try {
        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(err) {
        console.log(err);
    }
};

setup();