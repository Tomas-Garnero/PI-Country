const { Router } = require('express');

const { Activity, Country } = require('../db.js');
const { getActivityDetail } = require("../Controllers/Activity.js");

const router = Router();


router.get("/", async (req, res) => {

    try {
        const activities = await Activity.findAll({
            include: {
                // Incluime el modelo temperament
                model: Country,
                // Y de este modelo traeme los siguientes atributos
                attributes: ["id"],
                // Mediante los atributos
                through: {
                    attributes: []
                }
            }
        });

        let activitiesInfo = await activities.map(activity => {
            const { id, name, difficulty, duration, season, Countries } = activity;

            return {
                id, 
                name,
                difficulty,
                duration,
                season,
                countries: Countries
            }
        })

        activitiesInfo
            ? res.status(200).send(activitiesInfo)
            : res.status(404).send({msg: "Actividad no econtrada!"});

    } catch(error){
        console.log(error)
        return res.status(400).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const activityById = await getActivityDetail(id);

        activityById 
            ? res.status(200).json(activityById)
            : res.status(404).send({msg: "La actividad ingresada no existe!"}); 

    } catch(error) {
        res.status(400).send(error)
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });

        await newActivity.addCountry(countries);

        return res.status(201).send(newActivity);

    } catch(error) {
        console.log(error)
        return res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    if (!req.params.id) return res.status(400).send({ msg: "Bad Request" });

    const { name, difficulty, duration, season, countries } = req.body;

    if (!name || !difficulty || !duration || !season || !countries) return res.status(400).send({ msg: "Bad Request" });

    let activityObj = { name, difficulty, duration, season};

    try {
        const activityUpdate = await Activity.findOne({where: {id: req.params.id}});
        if (!activityUpdate) return res.status(400).send({ msg: "Activity Not Found" });

        await activityUpdate.update(activityObj);
        await activityUpdate.setCountries(countries);

        return res.send(activityUpdate);

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});


module.exports = router;

