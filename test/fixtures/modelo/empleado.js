const CEDB = require("../../../index.js");

class ModeloEmpleado extends CEDB.Modelo {

    nombreModelo(){
        return "Empleado";
    }

    nombreTabla() {
        return "empleado"
    }

    definicion(){

        return {

            id: {
                type: this.TIPOS.INTEGER,

                primaryKey: true,

                autoIncrement: true
            },

            dni: {
                type: this.TIPOS.STRING,

                unique: true
            },

            nss: {
                type: this.TIPOS.STRING,
    
                unique: true
            },

            nombre: this.TIPOS.STRING,

            apellidos: this.TIPOS.STRING

        }
    }
}

module.exports = ModeloEmpleado;
