"use strict";

const sequelize = require("sequelize");
const Modelo = require("./modelo.js");

class Bbdd{

    constructor(nombreBbdd, usuario, password){

        this.nombreBbdd = nombreBbdd;
        this.usuario = usuario;
        this.password = password;
        this.modelos = [];
        this.orm = false;
    }

    get(modelo){

        return this.orm.models[modelo];
    }

    registrarModelo(nombreModelo){

        this.modelos.push(nombreModelo);    

    }

    cargar(){

        let opciones = {};

        this.orm = new sequelize(

            this.nombreBbdd,
            this.usuario,
            this.password,

            this.__cargar(opciones)
        );

        return new Promise((cumplida, falla) => {

            this.orm.authenticate()

                .then(() => {
                    cumplida(this);
                })
                .catch((err) => {
                    falla(err);
                })

        });

    }
}

class BbddSqlite extends Bbdd{

    constructor(nombreBbdd, usuario, password, rutaBbdd){

        super(nombreBbdd, usuario, password);

        this.rutaBbdd = rutaBbdd;

    }

    __cargar(opciones){

        opciones["dialect"] = "sqlite";
        opciones["storage"] = this.rutaBbdd;
        
        return opciones;
    }
}

module.exports = {

    "BbddSqlite" : BbddSqlite

}
