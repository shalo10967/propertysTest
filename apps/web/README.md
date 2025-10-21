# ProyectoTest - Frontend

### Instalación de Dependencias

```bash
pnpm install
```

### Ejecutar en Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en: `http://localhost:3000`

### Build para Producción

```bash
pnpm build
```

## 🔌 Servicios API

Los servicios están en `src/services/api.js` y se comunican con el backend en `http://localhost:5000/api`.

### Variables de Entorno

Crea un archivo `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

