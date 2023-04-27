const { DataTypes } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // Models are defined with sequelize.define('name', {attributes}, {options})
  // Defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.CHAR(3),  // A FIXED length string (can contain letters, numbers, and special characters). The size parameter specifies the column length in characters - can be from 0 to 255. Default is 1
      allowNull: false,  // Ensures that a column cannot have a NULL value
      unique: true,  // Ensures that all values in a column are different. Can have many per table
      primaryKey: true,  // A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. Only one per table
    },

    name: {
      type: DataTypes.STRING,  // A variable length string. Default length 255
      allowNull: false,
    },

    flag_img: {
      type: DataTypes.STRING, 
      allowNull: false,
    },  
    
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capital: {
      type: DataTypes.STRING,
    },

    subregion: {
      type: DataTypes.STRING,
      defaultValue: "Other"
    },

    area: {
      type: DataTypes.INTEGER,  // Equal to INT(size)
    },

    population: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)
  });
};
