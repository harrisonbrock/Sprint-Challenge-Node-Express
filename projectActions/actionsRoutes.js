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
        .catch(() => res.status(500).send({ error: 'Cannot have Action' }))
});

router.post('/', (req, res) => {

    const action = req.body;

    if (!action.project_id || !action.description) {
        res.status(400).send({error:'Project Id and description are need'})
    }
    else if (action.description.length > 128) {
        res.status(400).send({error: 'Description cannot be over 128 chars'})
    }
    else {
        actionsDb.insert(action)
            .then(response => {
                res.status(202).send(response);
            })
            .catch(error => {
                res.status(500).send({error: 'Added Project to database'})
            })
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionsDb.remove(id)
        .then((response) => response === 0
            ? res.status(404).send({ error: `Project with id ${id} not found` })
            : res.status(200).send({ message: `Project with id ${id} deleted` }))
        .catch(err => {
        }).catch(err => {
        res.status(500).send({error: 'problem'});
    })
});

module.exports = router;