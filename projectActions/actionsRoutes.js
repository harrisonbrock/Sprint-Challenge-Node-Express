const express = require('express');
const actionsDb = require('../data/helpers/actionModel');

const router = express.Router();


router.get('/', (req, res) => {

    actionsDb.get()
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status('500').send({error: `Error getting actions`});
        })
});

router.get('/:id', (req, res) => {

    const id = req.params.id;
    actionsDb
        .get(id)
        .then((response) => response.length === 0
            ? res.status(404).send({error: `Project not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching actionss' }))
});

module.exports = router;