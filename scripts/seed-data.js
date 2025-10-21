// Run: mongosh ProyectoTestDB seed-data.js

// Clear collections
db.Owners.deleteMany({});
db.Properties.deleteMany({});
db.PropertyImages.deleteMany({});
db.PropertyTraces.deleteMany({});

print("🗑️  Colecciones limpiadas");

// Create owners
const owners = [
  {
    _id: ObjectId(),
    name: "Juan Gabriel Martinez",
    address: "Calle 123, Medellín, Colombia",
    photo: "https://i.pravatar.cc/150?img=1",
    birthday: new Date("1985-03-15")
  },
  {
    _id: ObjectId(),
    name: "Mario Martinez",
    address: "Carrera 45, Bogotá, Colombia",
    photo: "https://i.pravatar.cc/150?img=5",
    birthday: new Date("1990-07-22")
  },
  {
    _id: ObjectId(),
    name: "Maria Cristina Bustamante",
    address: "Avenida Oriental, Cali, Colombia",
    photo: "https://i.pravatar.cc/150?img=8",
    birthday: new Date("1982-11-30")
  }
];

db.Owners.insertMany(owners);
print(`✅ ${owners.length} propietarios creados`);

// Create properties
const properties = [
  {
    _id: ObjectId(),
    name: "Casa en el Centro",
    address: "Avenida siempre viva, Springfield",
    price: 2500000,
    codeInternal: "PROP-001",
    year: 2020,
    idOwner: owners[0]._id
  },
  {
    _id: ObjectId(),
    name: "Apartamento Moderno",
    address: "Calle bolivar, Antioquia",
    price: 3800000,
    codeInternal: "PROP-002",
    year: 2022,
    idOwner: owners[1]._id
  },
  {
    _id: ObjectId(),
    name: "Casa de Campo",
    address: "Km 23 vereda el rosario, Antioquia",
    price: 4200000,
    codeInternal: "PROP-003",
    year: 2019,
    idOwner: owners[0]._id
  },
  {
    _id: ObjectId(),
    name: "Penthouse",
    address: "Torre Ejecutiva, Poblado",
    price: 8500000,
    codeInternal: "PROP-004",
    year: 2023,
    idOwner: owners[2]._id
  },
  {
    _id: ObjectId(),
    name: "Casa familiar",
    address: "Calle 123, Medellin",
    price: 2900000,
    codeInternal: "PROP-005",
    year: 2021,
    idOwner: owners[1]._id
  }
];

db.Properties.insertMany(properties);
print(`✅ ${properties.length} propiedades creadas`);

// Create property images
const propertyImages = [
  {
    idProperty: properties[0]._id,
    file: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    enabled: true
  },
  {
    idProperty: properties[0]._id,
    file: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    enabled: true
  },
  {
    idProperty: properties[1]._id,
    file: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    enabled: true
  },
  {
    idProperty: properties[2]._id,
    file: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    enabled: true
  },
  {
    idProperty: properties[3]._id,
    file: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    enabled: true
  },
  {
    idProperty: properties[4]._id,
    file: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    enabled: true
  }
];

db.PropertyImages.insertMany(propertyImages);
print(`✅ ${propertyImages.length} imágenes creadas`);

// Create propertys traces
const propertyTraces = [
  {
    dateSale: new Date("2023-01-15"),
    name: "Venta",
    value: 2500000,
    tax: 125000,
    idProperty: properties[0]._id
  },
  {
    dateSale: new Date("2023-06-20"),
    name: "Alquiler mensual",
    value: 3800000,
    tax: 190000,
    idProperty: properties[1]._id
  },
  {
    dateSale: new Date("2023-03-10"),
    name: "Venta",
    value: 4200000,
    tax: 210000,
    idProperty: properties[2]._id
  },
  {
    dateSale: new Date("2023-09-05"),
    name: "Alquiler anual",
    value: 4400000,
    tax: 220000,
    idProperty: properties[2]._id
  },
  {
    dateSale: new Date("2024-01-12"),
    name: "Para estrenar",
    value: 8500000,
    tax: 425000,
    idProperty: properties[3]._id
  }
];

db.PropertyTraces.insertMany(propertyTraces);
print(`✅ ${propertyTraces.length} seguimientos creados`);

print("\n🎉 ¡Datos de ejemplo insertados exitosamente!");
print("\n📊 Resumen:");
print(`   Propietarios: ${owners.length}`);
print(`   Propiedades: ${properties.length}`);
print(`   Imágenes: ${propertyImages.length}`);
print(`   Seguimientos: ${propertyTraces.length}`);
print("\n✨ Puedes empezar a usar la aplicación!");

