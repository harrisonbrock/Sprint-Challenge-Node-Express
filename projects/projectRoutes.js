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

module.exports = router;