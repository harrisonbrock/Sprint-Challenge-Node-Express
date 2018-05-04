const express = require('express');
const projectsDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {

    projectsDb.get()
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status('500').send({error: `Error getting projects`});
        })
});

router.get('/:id', (req, res) => {

    const id = req.params.id;
    projectsDb
        .get(id)
        .then((response) => response.length === 0
            ? res.status(404).send({error: `Project not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching projects' }))
});

module.exports = router;