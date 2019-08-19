const express = require('express');
const router = express.Router();

const genreses = [
    { id: 1, name: 'action' },
    { id: 2, name: 'fiction'},
    { id: 3, name: 'avengers'},
    { id: 4, name: 'romantic'},
];

router.get('/', (req, res) => {
    return res.send(genreses);
});

router.get('/:id', (req, res) => {
    const genres = genreses.find( c => c.id === parseInt(req.params.id));
    if(!genres){
        return res.status(404).send('There is no genres with given id!');
    }
    return res.send(genres);
});

router.post('/', (req, res) => {
    const {error} = validateGenres(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const genres = {
        id: genreses.length + 1,
        name: req.body.name
    }
    genreses.push(genres);
    return res.send(genres);
});

router.put('/:id', (req, res) => {
    const genres = genreses.find( c => c.id === parseInt(req.params.id ));
    if(!genres){
        return res.status(404).send('The genres with given id was not found!');
    }
    const {error} = validateGenres(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    genres.name = req.body.name;
    return res.send(genres);
});

router.delete('/:id', (req, res) => {
    const genres = genreses.find( c => c.id === parseInt(req.params.id ));
    if(!genres){
        return res.status(404).send('The genres with given id was not found!');
    }
    genreses.splice(genreses.indexOf(genres), 1);
    return res.send(genres);
});

function validateGenres(genres){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genres, schema);
}

module.exports = router;