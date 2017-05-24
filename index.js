"use strict";

const Instancia = require("./lib/instancia.js");

module.exports = {

    Modelo: require("./lib/modelo.js"),

    bd: require("./lib/bbdd.js"),

    iniciar : (nombreBbdd, opciones) => {

        let instancia = new Instancia(nombreBbdd, opciones);

        return instancia.iniciar();
    }
    
};
