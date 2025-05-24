# F1 App - Frontend

Esta es la aplicación frontend para la gestión de datos de la Fórmula 1, desarrollada con React.

## Tecnologías Utilizadas

- React  
- React Router DOM  
- axios  
- jwt-decode  

## Dependencias

```json
{
  "@testing-library/dom": "^10.4.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/react": "^16.3.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.9.0",
  "cors": "^2.8.5",
  "jwt-decode": "^4.0.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.5.3",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

## Instalación

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO_FRONTEND>
cd frontend
```

### Instalar dependencias

```bash
npm install
```

## Ejecución

### Iniciar la aplicación

```bash
npm start
```

Esto ejecutará la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

## Despliegue

La aplicación está desplegada en Render.

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── app/
│   │   ├── auth/
│   │   ├── pilots/
│   │   ├── vehicles/
│   ├── constants/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   ├── index.js
├── package.json
```

## Descripción

Esta aplicación es un frontend de React para un sistema de gestión de datos de Fórmula 1. Permite a los usuarios interactuar con información sobre pilotos, vehículos, y posiblemente otra información relacionada con la F1. La aplicación utiliza React Router para la navegación, axios para hacer peticiones al backend, y jwt-decode para decodificar tokens web JSON.