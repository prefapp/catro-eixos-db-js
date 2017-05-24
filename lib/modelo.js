"use strict";

const sequelize = require("sequelize");

class Modelo {

    constructor(instanciaOrm){

        this.orm = instanciaOrm;
        this.TIPOS = sequelize.DataTypes;
        
   
    }

    cargar(){

        this.orm.define(

            this.nombreModelo(),

            this.definicion(),

            {
                tableName: this.nombreTabla()
            }

        )

    }

    //métodos abstractos a definir por las subclases
    nombreModelo(){
        throw "nombreModelo:ABSTRACTO!";
    }

    nombreTabla(){
        throw "nombreTabla: ABSTRACTO!"
    }

    definicion(){
        throw "definicion: ABSTRACTO!"
    }
    
}

module.exports = Modelo;
