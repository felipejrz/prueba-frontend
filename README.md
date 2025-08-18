# S2G-Energy Frontend

## Descripción del Proyecto

S2G-Energy Frontend es una aplicación web desarrollada en **Next.js (React)** que consume la API del backend de **prueba-backend**. 

El frontend está diseñado para ser **responsivo e intuitivo**, ofreciendo una interfaz amigable para la administración de estaciones y el análisis de datos.

---

## Funcionalidades

- **Autenticación de usuarios**
  - Inicio de sesión con usuario y contraseña.
  - Manejo de sesión mediante **JWT**.
  - Cierre de sesión seguro.

- **Gestión de estaciones**
  - Visualización de la lista de estaciones de carga registradas.
  - Creación de nuevas estaciones.
  - Actualización del estado de las estaciones (activo/inactivo) en tiempo real.

- **Visualización de datos**
  - Gráfica interactiva con filtros dinámicos (por hora, día, semana y mes).
  - Cada vez que se cambia el filtro, se realizan nuevas solicitudes al backend para obtener los datos actualizados.

---

## Estructura principal del proyecto

```

prueba-frontend
├── Crs
│   ├── App
│   │   ├── dashboard
│   │   │   ├── analitycs
│   │   │   │   └── page.tsx
│   │   │   ├── stations
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib
│   │   ├── api.js      
│   │   └── auth.js    
│   └── components

````

---

## Tecnologías utilizadas

- **Framework:** Next.js (React)
- **Estilos:** Tailwind CSS
- **HTTP Client:** Axios
- **Gráficas:** Chart.js + react-chartjs-2
- **Autenticación:** JWT (con jwt-decode)
- **Contenedores:** Docker

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/felipejrz/prueba-frontend.git
cd prueba-frontend
````

### 2. Configuración del Backend

Este frontend necesita que el backend (`prueba-backend`) esté corriendo en:

```
http://localhost:8000
```

Hay que levantar primero el backend:

```bash
cd ../prueba-backend
docker-compose up --build
```


### 3. Construcción y ejecución con Docker

El proyecto se ejecutara dentro de un contenedor Docker.

#### Construir la imagen:

```bash
docker build -t prueba-frontend .
```

#### Ejecutar el contenedor:

```bash
docker run -p 3000:3000 prueba-frontend
```

---

## Flujo de uso

1. **Iniciar sesión** con usuario y contraseña proporcionados por el backend.
2. Acceder al **dashboard** donde se listan las estaciones de carga.
3. Desde el dashboard:

   * **Crear** nuevas estaciones.
   * **Actualizar** el estado de las estaciones en tiempo real.
   * Visualizar la **gráfica interactiva** con filtros dinámicos (hora, día, semana, mes).

---

## Repos relacionados

* **Backend:** [S2G-Energy Backend](https://github.com/felipejrz/prueba-backend)
* **Frontend:** [S2G-Energy Frontend](https://github.com/felipejrz/prueba-frontend)
