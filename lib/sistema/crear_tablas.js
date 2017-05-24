const CE = require("catro-eixos-js");

const fs = require("fs");

class CrearTablas extends CE.Proceso {

    parametrosNecesarios() {

        return ["refBbdd"]
    }

    __r(){

        return [

            "__sincronizarModelos"

        ];
    }

    __sincronizarModelos(){

        return new Promise((cumplida, falla) => {

            let sincronizaciones = this.arg("refBbdd").modelos

                .map((modelo) => {

                    return this.arg("refBbdd")

                        .get(modelo)

                        .sync({force: this.arg("forzar")})

                });
        

            Promise.all(sincronizaciones)

                .then(() => {

                    cumplida();

                })

                .catch((err) => {

                    falla(err);
                })
        
        });
    }

    KO__sincronizarModelos(err) {

        this.error("ERROR_CREACION_DE_TABLAS: " + err);
        
    }   
}

module.exports = CrearTablas;
