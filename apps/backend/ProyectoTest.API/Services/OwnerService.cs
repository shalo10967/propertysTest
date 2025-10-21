using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProyectoTest.API.Models;

namespace ProyectoTest.API.Services;

public class OwnerService
{
    private readonly IMongoCollection<Owner> _ownersCollection;

    public OwnerService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _ownersCollection = mongoDatabase.GetCollection<Owner>("Owners");
    }

    public async Task<List<Owner>> GetAsync() =>
        await _ownersCollection.Find(_ => true).ToListAsync();

    public async Task<Owner?> GetAsync(string id) =>
        await _ownersCollection.Find(x => x.IdOwner == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Owner newOwner) =>
        await _ownersCollection.InsertOneAsync(newOwner);

    public async Task UpdateAsync(string id, Owner updatedOwner) =>
        await _ownersCollection.ReplaceOneAsync(x => x.IdOwner == id, updatedOwner);

    public async Task RemoveAsync(string id) =>
        await _ownersCollection.DeleteOneAsync(x => x.IdOwner == id);
}

