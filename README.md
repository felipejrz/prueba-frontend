# S2G-Energy - Prueba Frontend

Proyecto frontend de ejemplo usando **Next.js 15**, **Tailwind CSS** y **TypeScript**.

---

## 🔹 Descripción

Gestión de Estaciones de Carga. Este proyecto utiliza:

- **Next.js 15** con App Router
- **Tailwind CSS** para estilos
- **React** y **React DOM**
- Librerías auxiliares:
  - `axios` para llamadas HTTP
  - `jwt-decode` para decodificar tokens JWT
  - `react-icons` para iconos
  - `react-chartjs-2` y `chart.js` para gráficos

---

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-frontend
````

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🛠 Scripts disponibles

| Comando         | Descripción                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Inicia servidor de desarrollo    |
| `npm run build` | Construye la app para producción |
| `npm start`     | Ejecuta la app en producción     |
| `npm run lint`  | Ejecuta ESLint                   |

---

## 📂 Estructura del proyecto

```
prueba-frontend/
├─ src/
│  ├─ app/               # Rutas y layouts
│  ├─ components/        # Componentes reutilizables
│  ├─ styles/            # CSS global
│  │   └─ globals.css
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ README.md
```

---

## ⚡ Notas importantes

* Asegúrate de que todos los componentes que usan hooks o librerías del navegador tengan `"use client"` al inicio.
* Para producción, construir antes de ejecutar:

```bash
npm run build
npm start
```

* Tailwind requiere que las rutas de `content` en `tailwind.config.js` estén correctamente configuradas para incluir todos los componentes y layouts.
