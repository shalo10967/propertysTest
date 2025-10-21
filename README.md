# ProyectoTest - Monorepo

Sistema de gestión de propiedades construido con React, .NET 9 y MongoDB.

## 🏗️ Arquitectura del Proyecto

Este es un monorepo que contiene:

### Frontend (`apps/web`)
- **Framework:** React 18 + Vite
- **Arquitectura:** Atomic Design (Átomos, Moléculas, Organismos)
- **Gestión de Estado:** React Hooks
- **HTTP Client:** Axios

### Backend (`apps/backend/ProyectoTest.API`)
- **Framework:** .NET 9
- **Base de Datos:** MongoDB
- **ORM:** MongoDB.Driver
- **API Documentation:** Swagger/OpenAPI

## 📊 Modelo de Datos

### Entidades

1. **Owner (Propietario)**
   - IdOwner (ObjectId)
   - Name (string)
   - Address (string)
   - Photo (string, opcional)
   - Birthday (DateTime)

2. **Property (Propiedad)**
   - IdProperty (ObjectId)
   - Name (string)
   - Address (string)
   - Price (decimal)
   - CodeInternal (string)
   - Year (int)
   - IdOwner (ObjectId) - FK a Owner

3. **PropertyImage (Imagen de Propiedad)**
   - IdPropertyImage (ObjectId)
   - IdProperty (ObjectId) - FK a Property
   - File (string)
   - Enabled (bool)

4. **PropertyTrace (Seguimiento de Propiedad)**
   - IdPropertyTrace (ObjectId)
   - DateSale (DateTime)
   - Name (string)
   - Value (decimal)
   - Tax (decimal)
   - IdProperty (ObjectId) - FK a Property

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8
- .NET SDK 9
- MongoDB >= 7.0

### Configuración

1. **Clonar el repositorio:**
```bash
cd Mill
```

2. **Instalar dependencias del frontend:**
```bash
pnpm install
```

3. **Configurar MongoDB:**
```bash
mongod
```

4. **Configurar variables de entorno:**

Frontend (`apps/web/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

Backend (`apps/backend/ProyectoTest.API/appsettings.json`):
```json
{
  "MongoDB": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "ProyectoTestDB"
  }
}
```

## 🏃 Ejecución

### Modo Desarrollo

**Terminal 1 - Frontend:**
```bash
pnpm dev
```
El frontend estará disponible en: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd apps/backend/ProyectoTest.API
dotnet run
```
El backend estará disponible en: http://localhost:5000

**Swagger UI:**
http://localhost:5000/swagger

## 🌱 Cargar Datos de Ejemplo

Para llenar la base de datos con datos de prueba:

**Opción 1 - Manual:**
```bash
docker exec -i proyectotest-mongodb mongosh ProyectoTestDB < scripts/seed-data.js
```

Esto insertará:
- 3 Propietarios
- 5 Propiedades
- 6 Imágenes
- 5 Seguimientos de ventas/alquileres

## 🔌 API Endpoints

### Properties
- `GET /api/properties` - Obtener todas las propiedades
  - **Filtros disponibles (query parameters):**
    - `name` (string) - Buscar por nombre (parcial, case-insensitive)
    - `address` (string) - Buscar por dirección (parcial, case-insensitive)
    - `minPrice` (decimal) - Precio mínimo
    - `maxPrice` (decimal) - Precio máximo
  - **Ejemplo:** `/api/properties?name=Casa&minPrice=2000000&maxPrice=5000000`
- `GET /api/properties/{id}` - Obtener propiedad por ID
- `POST /api/properties` - Crear nueva propiedad
- `PUT /api/properties/{id}` - Actualizar propiedad
- `DELETE /api/properties/{id}` - Eliminar propiedad

### Owners
- `GET /api/owners` - Obtener todos los propietarios
- `GET /api/owners/{id}` - Obtener propietario por ID
- `POST /api/owners` - Crear nuevo propietario
- `PUT /api/owners/{id}` - Actualizar propietario
- `DELETE /api/owners/{id}` - Eliminar propietario

### Property Images
- `GET /api/propertyimages` - Obtener todas las imágenes
- `GET /api/propertyimages/{id}` - Obtener imagen por ID
- `GET /api/propertyimages/property/{propertyId}` - Obtener imágenes de una propiedad
- `POST /api/propertyimages` - Crear nueva imagen
- `PUT /api/propertyimages/{id}` - Actualizar imagen
- `DELETE /api/propertyimages/{id}` - Eliminar imagen

### Property Traces
- `GET /api/propertytraces` - Obtener todos los seguimientos
- `GET /api/propertytraces/{id}` - Obtener seguimiento por ID
- `GET /api/propertytraces/property/{propertyId}` - Obtener seguimientos de una propiedad
- `POST /api/propertytraces` - Crear nuevo seguimiento
- `PUT /api/propertytraces/{id}` - Actualizar seguimiento
- `DELETE /api/propertytraces/{id}` - Eliminar seguimiento