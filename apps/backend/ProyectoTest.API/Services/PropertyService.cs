using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProyectoTest.API.Models;

namespace ProyectoTest.API.Services;

public class PropertyService
{
    private readonly IMongoCollection<Property> _propertiesCollection;

    public PropertyService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _propertiesCollection = mongoDatabase.GetCollection<Property>("Properties");
    }

    public async Task<List<Property>> GetAsync(
        string? name = null,
        string? address = null,
        decimal? minPrice = null,
        decimal? maxPrice = null)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrWhiteSpace(name))
        {
            var nameFilter = filterBuilder.Regex(x => x.Name, new MongoDB.Bson.BsonRegularExpression(name, "i"));
            filters.Add(nameFilter);
        }

        if (!string.IsNullOrWhiteSpace(address))
        {
            var addressFilter = filterBuilder.Regex(x => x.Address, new MongoDB.Bson.BsonRegularExpression(address, "i"));
            filters.Add(addressFilter);
        }

        if (minPrice.HasValue)
        {
            var minPriceFilter = filterBuilder.Gte(x => x.Price, minPrice.Value);
            filters.Add(minPriceFilter);
        }

        if (maxPrice.HasValue)
        {
            var maxPriceFilter = filterBuilder.Lte(x => x.Price, maxPrice.Value);
            filters.Add(maxPriceFilter);
        }

        var combinedFilter = filters.Count > 0 
            ? filterBuilder.And(filters) 
            : filterBuilder.Empty;

        var result = await _propertiesCollection.Find(combinedFilter).ToListAsync();

        return result;
    }

    public async Task<Property?> GetAsync(string id) =>
        await _propertiesCollection.Find(x => x.IdProperty == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Property newProperty) =>
        await _propertiesCollection.InsertOneAsync(newProperty);

    public async Task UpdateAsync(string id, Property updatedProperty) =>
        await _propertiesCollection.ReplaceOneAsync(x => x.IdProperty == id, updatedProperty);

    public async Task RemoveAsync(string id) =>
        await _propertiesCollection.DeleteOneAsync(x => x.IdProperty == id);
}

