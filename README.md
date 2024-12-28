# TASK API

Tasks API es un proyecto para gestionar tareas, proporcionando endpoints para crear, actualizar, eliminar y listar tareas. Este proyecto incluye documentación con Swagger.


## Tecnologias

```
- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
```


## Documentacion
Swagger está habilitado en este proyecto. Puedes acceder a la documentación interactiva en:

```bash
https://https://coally-api-2.onrender.com/api-docs/api-docs
```

## Arquitectura del Proyeto

```bash
coally-api/
├── src/
│   ├── config/                         # Archivos de configuración (variables de entorno, configuración de servicios externos)
│   ├── controllers/                    # Gestiona las peticiones HTTP entrantes y devuelve las respuestas
│   ├── middlewares/                    # Funciones middleware personalizadas para la gestión y validación de peticiones
│   ├── models/                         # Esquemas y modelos Mongoose para colecciones MongoDB
│   ├── repositories/                   # Encapsula la interacción directa con la base de datos para operaciones CRUD específicas
│   ├── routes/                         # Define los puntos finales de la API y los vincula a los controladores
│   ├── services/                       # Lógica de negocio e interacción con la base de datos; encapsula lógica compleja
│   ├── types/                          # Definiciones de tipo TypeScript, incluyendo DTOs para controladores y servicios
│   └── index.ts                        # Punto de entrada de la aplicación, configura el servidor
│   ├── ...
├── package.json
└── tsconfig.json

```

## Instrucciones

para inicia `coally-api`, sigue estos pasos:

1. Clone the repository:

```bash
git clone https://github.com/coally-test/coally-api.git
```

o con SSH 


```bash
git clone git@<your-hostname>:coally-test/coally-api.git
```
2. ingresa al folder


```bash
cd coally-api
```

3. instala las dependencias necesarias:

```bash
npm install
```

4. configura las variables de entorno creando `.env`

5. inicialice el proyecto

```bash
npm run dev
```