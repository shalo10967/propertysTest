using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProyectoTest.API.Models;

public class PropertyImage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? IdPropertyImage { get; set; }

    [BsonElement("idProperty")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } = null!;

    [BsonElement("file")]
    public string File { get; set; } = null!;

    [BsonElement("enabled")]
    public bool Enabled { get; set; }
}

