const CE = require("catro-eixos-js");

const fs = require("fs");

class CargarModelos extends CE.Proceso {

    parametrosNecesarios() {

        return ["rutaModelos", "refBbdd"]
    }

    __r(){

        return [

            "__buscarModelos",
            "__realizarCargaModelos",
            "__registrarModelos"

        ];
    }

    __buscarModelos() {

        return new Promise((cumplida, falla) => {

            fs.readdir(this.arg("rutaModelos"), (err, lista) => {

                if(err) return falla(err); 

                lista = lista.filter((fichero) => {

                    return fichero.match(/\.js$/)

                }).map((modulo) => {

                    return require(this.arg("rutaModelos") + "/" + modulo);
                });

                cumplida(lista);

            })

        })

    }

    OK__buscarModelos(modulosModelos){

        this["modulosModelos"] = modulosModelos;
    }

    KO__buscarModelos(err){

        this.error("EN_LECTURA_DE_DIRECTORIO_MODELOS: " + err);
    }

    __realizarCargaModelos(){

        this["modelos"] = this["modulosModelos"].map((m) => {

            let mo  = new m(this.arg("refBbdd").orm);

            mo.cargar();

            return mo;

        })
    }

    __registrarModelos(){

        this["modelos"].forEach((modelo) => {

            this.arg("refBbdd").registrarModelo(

                modelo.nombreModelo()

            );

        })

    }
}

module.exports = CargarModelos;
