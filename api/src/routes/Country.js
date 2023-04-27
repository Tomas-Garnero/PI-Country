const { Router } = require('express');

const { getApiInfo, getCountryDetail } = require("../Controllers/Country.js");
const { Country, Activity } = require('../db.js');

const router = Router();


router.get("/", async (req, res) => {
    const { name } = req.query;

    try {
        const allCountries = await getApiInfo();

        if (name) {
            let countryName = await allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
            countryName.length 
                ? res.status(200).send(countryName) 
                : res.status(404).send({msg: "El país especificado no se encuentra!!"});
        } else {
            res.status(200).send(allCountries);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const countryById = await getCountryDetail(id);

        countryById 
            ? res.status(200).json(countryById)
            : res.status(404).send({msg: "El pais ingresado no existe!"}); 

    } catch(error) {
        res.status(400).send(error)
        console.log(error);
    }
});

router.put("/:idc", async (req, res) => {
    const {idc} = req.params;
    const {id} = req.body;
    
    try {
        const activityUpdate = await Activity.findByPk(id, {
            include: {
                // Incluime el modelo activity
                model: Country,
                // Y de este modelo activity traeme los siguientes atributos
                attributes: ["id"],
                // Mediante los atributos
                through: {
                    attributes: []
                },
            }
        });

        if (!activityUpdate) return res.status(400).send({ msg: "Activity Not Found" });

        const idToDelete = idc.toUpperCase();
        const countryToDelete = activityUpdate.Countries.filter(country => country.id !== idToDelete);

        if(countryToDelete.length === 0) {
            await Activity.destroy({where: {
                id: id
            }});
            return res.status(200).send({msg: "Activity was deleted"});
        } else {
            await activityUpdate.setCountries(countryToDelete);
            return res.status(200).send({msg: "The country was deleted"});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});


module.exports = router;


















