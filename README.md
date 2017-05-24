# CatroEixos::DB

Sistema de conexión con bbdd para catro-eixos-js. 

## Descripción

Este módulo emplea [sequelize](http://docs.sequelizejs.com/) para exponer una bbdd mediante un sistema de ORM.

## Empleo

```bash
npm install --save catro-eixos-db-js
```

### Uso básico

#### Definición de modelos

En un directorio de nuestro proyecto creamos los ficheros de modelo de cada tabla:

```js

//fichero: ~/modelos/empleado.js

const CEBD = require("catro-eixos-db-js");

class ModeloEmpleado extends CEBD.Modelo{

    nombreModelo(){
        return "Empleado";
    }

    nombreTabla(){
        return "empleado";
    }       

    //aquí va la descripción de la tabla
    //empleamos el lenguaje de modelado de sequelize
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


```
#### Empleo del orm

Una vez hemos definido nuestro modelado de datos en ficheros separados para cada modelo, iniciamos el sistema. 

```js

const CEBD = require("catro-eixos-db-js");

CEBD.iniciar(

    "empleados", //nombre de la bbdd

    {
        tipoBbdd: "sqlite", //u otro dialecto (mysql, postgresql...)
        usuario: "foo",

        password: "mi-secreto",

        //directorio de nuestros ficheros .js con los modelos
        rutaModelos: "../modelos", 

        //solo para dialecto sqlite
        rutaBbdd: "/tmp/test.sqlite"
    }

)
.then((instancia) => {

    //recibimos una instancia cargada con nuestros modelos
})
.catch((err) => {

    throw "¡Oh no! Error: " + err
})


```



