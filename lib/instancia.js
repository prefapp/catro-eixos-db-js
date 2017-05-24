
const CE = require("catro-eixos-js");
//const ProcesoIniciar = require("./sistema/iniciar.js");

class Instancia{

    constructor(nombreBbdd, opciones){

        this.nombreBbdd = nombreBbdd;
        this.opciones = opciones;
        this.orm = false;       
        this.procesador = false;
    }


    iniciar(){

        let nombreBbdd = this.nombreBbdd;
        let opciones = this.opciones;

        return new Promise((cumplida, falla) => {

            //cargamos el procesador con los procesos internos
            this.__init()

            .then((procesador) => {

                this.procesador = procesador;
            })
        
            .then(() => {

                //iniciamos bbdd (proceso interno)
                return this.__ejecutarTarea(

                    "BD.iniciar",

                    {
                        nombreBbdd: nombreBbdd,
                        usuario: opciones.usuario,
                        password: opciones.password,
                        tipoBbdd: opciones.tipoBbdd,
                        rutaModelos: opciones.rutaModelos,
                        rutaBbdd: opciones.rutaBbdd
                    }

                )

            })

            .then((tarea) => {
 
                this.orm = tarea.resultados.orm;           

                cumplida(this);

            })
            .catch((tarea) => {

                if(!tarea.resultados) return falla(tarea);

                falla(tarea.resultados.error);
            })

        })
    }

    //se puede forzar (¡OJO! se carga la tabla si existe)
    crearTablas(forzar=false){
    
        return this.__ejecutarTarea(

            "BD.crear_tablas",

            {
                forzar: forzar,
        
                refBbdd: this.orm

            }

        );
    }

    __init(){

        return CE.init({

            "BD" : __dirname + "/sistema" 
        });
    }

    __ejecutarTarea(proceso, args){

        args.proceso = proceso;

        return this.procesador.ejecutar(

            new CE.Tarea(
    
                "",

                args

            )

        )
    }
}

module.exports = Instancia;
