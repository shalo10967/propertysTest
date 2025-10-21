using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProyectoTest.API.Models;

namespace ProyectoTest.API.Services;

public class PropertyTraceService
{
    private readonly IMongoCollection<PropertyTrace> _propertyTracesCollection;

    public PropertyTraceService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _propertyTracesCollection = mongoDatabase.GetCollection<PropertyTrace>("PropertyTraces");
    }

    public async Task<List<PropertyTrace>> GetAsync() =>
        await _propertyTracesCollection.Find(_ => true).ToListAsync();

    public async Task<PropertyTrace?> GetAsync(string id) =>
        await _propertyTracesCollection.Find(x => x.IdPropertyTrace == id).FirstOrDefaultAsync();

    public async Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId) =>
        await _propertyTracesCollection.Find(x => x.IdProperty == propertyId).ToListAsync();

    public async Task CreateAsync(PropertyTrace newPropertyTrace) =>
        await _propertyTracesCollection.InsertOneAsync(newPropertyTrace);

    public async Task UpdateAsync(string id, PropertyTrace updatedPropertyTrace) =>
        await _propertyTracesCollection.ReplaceOneAsync(x => x.IdPropertyTrace == id, updatedPropertyTrace);

    public async Task RemoveAsync(string id) =>
        await _propertyTracesCollection.DeleteOneAsync(x => x.IdPropertyTrace == id);
}

