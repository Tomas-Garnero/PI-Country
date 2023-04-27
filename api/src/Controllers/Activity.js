const { Country, Activity } = require("../db.js");


const getActivityDetail = async (id) => {
    try {
        const activityById = await Activity.findByPk(id, {
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

        return activityById;

    } catch (error) {
        console.log(error);
    }
};

module.exports = { getActivityDetail };