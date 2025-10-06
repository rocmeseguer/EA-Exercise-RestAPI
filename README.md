# EA API REST con Express

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [MongoDB](https://www.mongodb.com/) (puede ser local o en la nube a través de MongoDB Atlas)
- [npm](https://www.npmjs.com/) 

Instalar TypeScript
```
npm install -g typescript
```

## Clonar el proyecto

```
git clone https://github.com/rocmeseguer/EA-Exercise-RestAPI.git
cd EA-Exercise-RestAPI
```

## Dependencias del proyecto

### Instalar todas las dependencias
```
npm install
```

### Instalar una a una las dependencias

Express
```
npm i express
npm i @types/express -D
npm i express-validator
```

Mongoose
```
npm i mongoose
```

CORS
```
npm i cors
```

## Tecnologías utilizadas

- **Node.js**: Un entorno de ejecución de JavaScript en el lado del servidor.
- **TypeScript**: Lenguaje de programación de alto nivel de código abierto que añade tipado estático a JavaScript.
- **Mongoose**: Una libreria para usar MondoDB como base de datos.
- **Express**: Una librería para hacer aplicaciones web
- **Morgan**: HTTP request logger middleware for node.js
- **Pino**: Una librería para hacer logs

## Estructura del proyecto

```
├── src
│   ├── middlewares
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── models
│   ├── database.ts
│   └── app.ts          # Punto de entrada de la aplicación
├── dist
├── package.json       # Configuración de las dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript
├── node_modules
├── .gitignore
├── LICENSE
└── README.md
```

## Ejecutar
```
tsc
node dist/index.js
```
