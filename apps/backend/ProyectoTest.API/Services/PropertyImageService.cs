using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProyectoTest.API.Models;

namespace ProyectoTest.API.Services;

public class PropertyImageService
{
    private readonly IMongoCollection<PropertyImage> _propertyImagesCollection;

    public PropertyImageService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _propertyImagesCollection = mongoDatabase.GetCollection<PropertyImage>("PropertyImages");
    }

    public async Task<List<PropertyImage>> GetAsync() =>
        await _propertyImagesCollection.Find(_ => true).ToListAsync();

    public async Task<PropertyImage?> GetAsync(string id) =>
        await _propertyImagesCollection.Find(x => x.IdPropertyImage == id).FirstOrDefaultAsync();

    public async Task<List<PropertyImage>> GetByPropertyIdAsync(string propertyId) =>
        await _propertyImagesCollection.Find(x => x.IdProperty == propertyId).ToListAsync();

    public async Task CreateAsync(PropertyImage newPropertyImage) =>
        await _propertyImagesCollection.InsertOneAsync(newPropertyImage);

    public async Task UpdateAsync(string id, PropertyImage updatedPropertyImage) =>
        await _propertyImagesCollection.ReplaceOneAsync(x => x.IdPropertyImage == id, updatedPropertyImage);

    public async Task RemoveAsync(string id) =>
        await _propertyImagesCollection.DeleteOneAsync(x => x.IdPropertyImage == id);
}

