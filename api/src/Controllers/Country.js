const axios = require("axios");

const { Country, Activity } = require("../db.js");


const getApiInfo = async () => {

    let countries = await Country.findAll({
        attributes: ["id", "name", "flag_img", "continent", "population"],
        include: {
            // Incluime el modelo activity
            model: Activity,
            // Y de este modelo activity traeme los siguientes atributos
            attributes: ["id", "name", "difficulty", "duration", "season"],
            // Mediante los atributos
            through: {
                attributes: []
            },
        }
    });

    if(!countries.length) {
        try {
            let apiUrl = await axios.get("https://restcountries.com/v3.1/all");
    
            let apiInfo = await apiUrl.data.map(country => {
                const { cioc, cca3, name, flags, continents, capital, subregion, area, population } = country;
                
                return {
                    id: cioc ? cioc : cca3,
                    name: name.common,
                    flag_img: flags.png,
                    continent: continents ? continents[0] : "Continent Not Found",
                    capital: capital ? capital[0] : "Continent Not Found",
                    subregion,
                    area,
                    population
                }
            })
    
            await Country.bulkCreate(apiInfo);

            countries = await Country.findAll({
                attributes: ["id", "name", "flag_img", "continent", "population"],
                include: {
                    // Incluime el modelo activity
                    model: Activity,
                    // Y de este modelo activity traeme los siguientes atributos
                    attributes: ["id", "name", "difficulty", "duration", "season"],
                    // Mediante los atributos
                    through: {
                        attributes: []
                    },
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    return countries;
};

const getCountryDetail = async (id) => {
    try {
        const countryById = await Country.findByPk(id.toUpperCase(), {
            include: {
                // Incluime el modelo activity
                model: Activity,
                // Y de este modelo activity traeme los siguientes atributos
                attributes: ["id", "name", "difficulty", "duration", "season"],
                // Mediante los atributos
                through: {
                    attributes: []
                },
            }
        });

        return countryById;

    } catch (error) {
        console.log(error);
    }
};

module.exports = { getApiInfo, getCountryDetail };