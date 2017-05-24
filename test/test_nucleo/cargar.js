"use strict";

const chai = require("chai");

const expect = chai.expect;
const assert = chai.assert;

const CE = require("catro-eixos-js");
const CEDB = require("../../index.js");

const CargarModelos = require("../../lib/sistema/cargar_modelos.js");

describe("Núcleo - Base", () => {

    let rutaBbdd;
    let Bbdd;

    before((hecho) => {

        rutaBbdd = "/tmp/bbdd_sqlite.test";

        hecho();

    })

    describe("Ejecución", () => {

        it("Realiza una conexión normal a un sqlite", (hecho) => {

            new CEDB.bd.BbddSqlite(

                "test",
                "",
                "",
                rutaBbdd

            )

            .cargar()

            .then((bbdd) => {

                Bbdd = bbdd;

                hecho();
            })

            .catch((err) => {

                console.log(err);

                hecho(false);
            });
        });

        it("Realiza una carga válida de los modelos", (hecho) => {

            new CargarModelos(

                new CE.Tarea(

                    "test",

                    {
                        refBbdd: Bbdd,

                        rutaModelos: __dirname + "/../fixtures/modelo"
                    }
            
                )

            ).ejecutar()

                .then((tarea) => {

                    hecho();

                })

                .catch((tarea) => {

                    console.log(tarea.resultados);
                    hecho(false);

                })

        })

        it("El sistema se inicia correctamente", (hecho) => {

            CEDB.iniciar("test", {

                tipoBbdd: "sqlite",

                rutaModelos: __dirname + "/../fixtures/modelo",

                

            })
            .then((orm) => {

                hecho();
            })

            .catch((err) => {

                console.log(err);
                hecho(1);

            })

        })
    })

})
