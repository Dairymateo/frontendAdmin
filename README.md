# F1 App - Frontend

Este proyecto es el frontend de una aplicación para la gestión de datos de la Fórmula 1. Permite a los usuarios interactuar con información sobre pilotos, vehículos, circuitos y realizar predicciones.

## Tecnologías Utilizadas

* **React**
* **React Router DOM**
* **axios** (para peticiones HTTP)
* **jwt-decode** (para manejar tokens JWT)
* **CSS Modules**

## Dependencias

```json
{
  "axios": "^1.9.0",
  "jwt-decode": "^4.0.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.5.3"
}
```

## Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la aplicación:

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
├── .gitignore
├── package.json
├── README.md
```

## Funcionalidades

* **Gestión de pilotos**: Crear, leer, actualizar y eliminar pilotos.
* **Gestión de vehículos**: Crear, leer, actualizar y eliminar vehículos.
* **Gestión de circuitos**: Ver circuitos y rankings asociados.
* **Autenticación**: Registro e inicio de sesión con JWT.

## Endpoints Consumidos

### Autenticación

* `POST /auth/register` - Registro de usuarios.
* `POST /auth/login` - Inicio de sesión.

### Pilotos

* `GET /pilots` - Obtener todos los pilotos.
* `POST /pilots` - Crear un piloto.
* `PATCH /pilots/:id` - Actualizar un piloto.
* `DELETE /pilots/:id` - Eliminar un piloto.

### Vehículos

* `GET /vehicles` - Obtener todos los vehículos.
* `POST /vehicles` - Crear un vehículo.
* `PATCH /vehicles/:id` - Actualizar un vehículo.
* `DELETE /vehicles/:id` - Eliminar un vehículo.

### Circuitos

* `GET /circuits` - Obtener todos los circuitos.
* `GET /circuits/:id` - Obtener detalles de un circuito.
* `POST /circuits` - Crear un circuito.
* `PATCH /circuits/:id` - Actualizar un circuito.
* `DELETE /circuits/:id` - Eliminar un circuito.

## Despliegue

El frontend está desplegado en Render y accesible en:

👉 [https://frontendf1.onrender.com](https://frontendf1.onrender.com)
