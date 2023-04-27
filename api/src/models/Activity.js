const { DataTypes } = require('sequelize');  // Guardamos en DataTypes los tipos de datos que requerimos de sequelize

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // Models are defined with sequelize.define('name', {attributes}, {options})
  // Defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,  
      defaultValue: DataTypes.UUIDV4,  
      primaryKey: true,  // A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. Only one per table
    },

    name: {
      type: DataTypes.STRING, 
      allowNull: false,  
    },

    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      validate: {
        min: 1,
        max: 5
      }
    },

    duration: {
      type: DataTypes.STRING,
    },

    season: {
      type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring")
    }
}, {
  timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)
  });
};
