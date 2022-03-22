const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Diver, DiveSite } = require('./db/index');

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'public')));
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

app.delete('/api/divers/:id', async(req, res, next) => {
    try {
        const diver = await Diver.findByPk(req.params.id);
        await diver.destroy();
        res.sendStatus(204);
    }
    catch(err) {
        next(err);
    }
});

app.post('/api/divers', async(req, res, next) => {
    try {
        res.status(201).send(await Diver.create(req.body));
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