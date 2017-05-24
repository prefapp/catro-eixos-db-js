const CE = require("catro-eixos-js");

const BBDD = require("../bbdd.js");

const CargarModelos = require("./cargar_modelos.js");

class Iniciar extends CE.Proceso {

    parametrosNecesarios() {

        return [

            "nombreBbdd",
            "rutaModelos",
            "tipoBbdd"

        ]
    }

    __r(){

        return [

            "__determinarTipoBbdd",
            "__cargarBbdd",
            "__cargarModelos",
            "__devolverInstanciaORM"

        ];
    }

    __determinarTipoBbdd(){

        if(this.arg("tipoBbdd") == 'sqlite'){
            return BBDD.BbddSqlite
        }
        else{
            throw "TIPO_BBDD_DESCONOCIDO, " + this.arg("tipoBbdd")
        }

    }

    OK__determinarTipoBbdd(claseBbdd){

        this["claseBbdd"] = claseBbdd;
    }

    KO__determinarTipoBbdd(err){

        this.error("DETERMINAR_TIPO_BBDD: " + err);
    }

    __cargarBbdd(){

        return new Promise((cumplida, falla) => {

            let bbdd = new this["claseBbdd"](

                this.arg("nombreBbdd"),
                this.arg("usuario"),
                this.arg("password"),
                this.arg("rutaBbdd")

            );

            bbdd.cargar()

                .then(() => {

                    cumplida(bbdd);
                })

                .catch((err) => {

                    falla(err);

                })
        })
    }

    KO__cargarBbdd(err){

        this.error("INICIO_SESION_BBDD: " + err);
    }
    
    OK__cargarBbdd(bbdd){
        this["bbdd"] = bbdd;
    }

    __cargarModelos(){
    
        return this.subProceso(

            "BD.cargar_modelos",

            {
                refBbdd: this["bbdd"],

                rutaModelos: this.arg("rutaModelos")

            }

        );

    }

    KO__cargarModelos(err) {

        this.error("CARGA_DE_MODELOS: " + err);
    }


    __devolverInstanciaORM(){

        this.resultado(

            "orm",

            this["bbdd"]

        );
    }
}

module.exports = Iniciar;
