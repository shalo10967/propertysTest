using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProyectoTest.API.Models;

public class PropertyTrace
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? IdPropertyTrace { get; set; }

    [BsonElement("dateSale")]
    public DateTime DateSale { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("value")]
    [BsonRepresentation(BsonType.Int64)]
    public decimal Value { get; set; }

    [BsonElement("tax")]
    [BsonRepresentation(BsonType.Int64)]
    public decimal Tax { get; set; }

    [BsonElement("idProperty")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } = null!;
}

