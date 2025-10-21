# ProyectoTest - Backend API

### Instalación de Dependencias

```bash
cd ProyectoTest.API
dotnet restore
```

### Ejecutar la Aplicación

```bash
dotnet run
```

La API estará disponible en: `http://localhost:5000`

## 📚 Documentación API

Una vez que la aplicación esté ejecutándose, visita:
- Swagger UI: `http://localhost:5000/swagger`

## 🔧 Configuración

### MongoDB

Edita `appsettings.json`:

```json
{
  "MongoDB": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "ProyectoTestDB"
  }
}
```

- `Owners` - Propietarios
- `Properties` - Propiedades
- `PropertyImages` - Imágenes de propiedades
- `PropertyTraces` - Historial de propiedades

