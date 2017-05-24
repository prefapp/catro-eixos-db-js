const CEDB = require("../../../index.js");

class ModeloCiudad extends CEDB.Modelo {

    nombreModelo(){
        return "Ciudad";
    }

    nombreTabla() {
        return "ciudad"
    }

    definicion(){

        return {

            id: {
                type: this.TIPOS.INTEGER,

                primaryKey: true,

                autoIncrement: true
            },

            nombre: {
                type: this.TIPOS.STRING,

                unique: true
            },

            num_hab: this.TIPOS.INTEGER,

        }
    }
}

module.exports = ModeloCiudad;
