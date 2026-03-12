# 🌍 Visor GIS de viajes personales

Un pequeño visor geoespacial construido con **React, Cesium y Flask** que muestra las ciudades que he visitado sobre un globo 3D interactivo.

Los datos de las ciudades se almacenan en **PostgreSQL** y se sirven mediante una API en **Flask**. El frontend consume esta API y renderiza los puntos sobre el planeta usando **CesiumJS**.

El resultado es un mapa interactivo de mis viajes alrededor del mundo.

---

# 🧠 Arquitectura

El proyecto está dividido en dos partes:

```
PostgreSQL
     ↓
Flask API
     ↓
React + Cesium
     ↓
Visualización 3D del planeta
```

### Backend

* **Flask**
* **PostgreSQL**
* **psycopg**
* API REST simple

### Frontend

* **React**
* **TypeScript**
* **CesiumJS**
* **Vite**

---

# ✨ Funcionalidades actuales

* 🌍 Globo 3D interactivo con Cesium
* 📍 Marcadores en las ciudades visitadas
* 🏠 Icono especial para ciudades base (Madrid, Londres, Bangkok)
* ✈ Líneas punteadas que conectan los destinos
* 🔗 API que sirve las ciudades desde PostgreSQL

---

# 📦 Estructura del proyecto

```
VisorGIS
│
├── Backend
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
└── Frontend
    ├── src
    │   ├── components
    │   │   └── Visor.tsx
    │   └── App.tsx
    │
    ├── public
    │   └── icons
    │       └── home.png
    │
    ├── vite.config.ts
    └── package.json
```

---

# ⚙️ Instalación

## 1️⃣ Backend

Crear entorno virtual e instalar dependencias:

```bash
pip install -r requirements.txt
```

Crear un archivo `.env` en `Backend`

Ejecutar el servidor:

```bash
python app.py
```

La API está disponible en:

```
http://localhost:5000/cities
```

---

## 2️⃣ Frontend

Instalar dependencias:

```bash
npm install
```

Crear `.env` en `Frontend`:

```
VITE_CESIUM_TOKEN=your_cesium_token
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El visor se abrirá en:

```
http://localhost:5173
```

---

# 🗄️ Base de datos

Tabla utilizada:

```sql
CREATE TABLE visited_cities (
    id SERIAL PRIMARY KEY,
    name TEXT,
    country TEXT,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION
);
```

Ejemplo de entrada:

```sql
INSERT INTO visited_cities (name, country, lat, lon)
VALUES ('Madrid', 'Spain', 40.4168, -3.7038);
```

---

# 🛰️ Cesium

El proyecto utiliza **CesiumJS** para renderizar el planeta en WebGL.

Se requiere un **Cesium Ion Access Token** que puede obtenerse en:

```
https://ion.cesium.com
```

---

# 📚 Objetivo del proyecto

Este proyecto fue creado como práctica para aprender y experimentar con:

* desarrollo de visores GIS
* CesiumJS
* APIs con Flask
* integración React + motores WebGL
* visualización geoespacial

---

# 🔮 Posibles mejoras

Ideas futuras:

* 🧭 Popups con información de cada viaje
* 📅 fechas de visita
* 🗺 clustering de ciudades
* ✈ animación de rutas entre ciudades
* 🧑‍🚀 timeline de viajes

---

# 📜 Licencia

Proyecto personal con fines educativos.

