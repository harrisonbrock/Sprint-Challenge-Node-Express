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

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectsDb.remove(id)
        .then((response) => response === 0
            ? res.status(404).send({ error: `Project with id ${id} not found` })
            : res.status(200).send({ message: `Project with id ${id} deleted` }))
        .catch(err => {
        }).catch(err => {
        res.status(500).send({error: 'problem'});
    })
});

router.post("/", (req, res) => {
    const project = req.body;
    if (!project.name || !project.description) {
        res.status(400).json({ error: "Please specify name and description" });
    } else if (project.name.length > 128 || project.description.length > 128) {
        res
            .status(400)
            .json({ error: "Name and description can't exceed 128 characters" });
    } else {
        projectsDb
            .insert(project)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({ error: "Error occured" });
            });
    }
});

module.exports = router;