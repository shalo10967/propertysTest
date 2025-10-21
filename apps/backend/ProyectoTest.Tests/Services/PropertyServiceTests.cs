using Xunit;
using Moq;
using FluentAssertions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProyectoTest.API.Models;
using ProyectoTest.API.Services;

namespace ProyectoTest.Tests.Services;

public class PropertyServiceTests
{
    private readonly Mock<IMongoCollection<Property>> _mockCollection;
    private readonly Mock<IMongoDatabase> _mockDatabase;
    private readonly Mock<IMongoClient> _mockClient;
    private readonly IOptions<MongoDBSettings> _mockSettings;
    private readonly PropertyService _service;

    public PropertyServiceTests()
    {
        _mockCollection = new Mock<IMongoCollection<Property>>();
        _mockDatabase = new Mock<IMongoDatabase>();
        _mockClient = new Mock<IMongoClient>();

        var settings = new MongoDBSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "TestDB"
        };
        _mockSettings = Options.Create(settings);

        _mockClient
            .Setup(c => c.GetDatabase(It.IsAny<string>(), It.IsAny<MongoDatabaseSettings>()))
            .Returns(_mockDatabase.Object);

        _mockDatabase
            .Setup(d => d.GetCollection<Property>(It.IsAny<string>(), It.IsAny<MongoCollectionSettings>()))
            .Returns(_mockCollection.Object);

        _service = new PropertyService(_mockSettings);
    }

    [Fact]
    public async Task GetAsync_WithoutFilters_ReturnsAllProperties()
    {
        var properties = new List<Property>
        {
            new Property { IdProperty = "1", Name = "Property 1", Price = 100000 },
            new Property { IdProperty = "2", Name = "Property 2", Price = 200000 }
        };

        var mockCursor = new Mock<IAsyncCursor<Property>>();
        mockCursor.Setup(c => c.Current).Returns(properties);
        mockCursor
            .SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);

        _mockCollection
            .Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<FindOptions<Property>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockCursor.Object);

        var result = await _service.GetAsync();

        result.Should().HaveCount(2);
        result[0].Name.Should().Be("Property 1");
        result[1].Name.Should().Be("Property 2");
    }

    [Fact]
    public async Task GetAsync_WithNameFilter_ReturnsFilteredProperties()
    {
        var property = new Property
        {
            IdProperty = "1",
            Name = "Test Property",
            Address = "Test Address",
            Price = 250000
        };

        var mockCursor = new Mock<IAsyncCursor<Property>>();
        mockCursor.Setup(c => c.Current).Returns(new List<Property> { property });
        mockCursor
            .SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);

        _mockCollection
            .Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<FindOptions<Property>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockCursor.Object);

        var result = await _service.GetAsync(name: "Test");

        result.Should().ContainSingle();
        result[0].Name.Should().Be("Test Property");
    }

    [Fact]
    public async Task GetAsync_WithPriceRange_ReturnsFilteredProperties()
    {
        var property = new Property
        {
            IdProperty = "1",
            Name = "Test Property",
            Address = "Test Address",
            Price = 250000
        };

        var mockCursor = new Mock<IAsyncCursor<Property>>();
        mockCursor.Setup(c => c.Current).Returns(new List<Property> { property });
        mockCursor
            .SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);

        _mockCollection
            .Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<FindOptions<Property>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockCursor.Object);

        var result = await _service.GetAsync(minPrice: 200000, maxPrice: 300000);

        result.Should().ContainSingle();
        result[0].Price.Should().Be(250000);
    }

    [Fact]
    public async Task GetAsync_ById_ReturnsProperty()
    {
        var property = new Property
        {
            IdProperty = "1",
            Name = "Test Property",
            Address = "Test Address",
            Price = 250000
        };

        var mockCursor = new Mock<IAsyncCursor<Property>>();
        mockCursor.Setup(c => c.Current).Returns(new List<Property> { property });
        mockCursor
            .SetupSequence(c => c.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);
        mockCursor
            .Setup(c => c.FirstOrDefaultAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(property);

        _mockCollection
            .Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<FindOptions<Property>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockCursor.Object);

        var result = await _service.GetAsync("1");

        result.Should().NotBeNull();
        result!.IdProperty.Should().Be("1");
        result.Name.Should().Be("Test Property");
    }

    [Fact]
    public async Task CreateAsync_AddsProperty()
    {
        var newProperty = new Property
        {
            Name = "New Property",
            Address = "New Address",
            Price = 300000,
            Year = 2023
        };

        _mockCollection
            .Setup(c => c.InsertOneAsync(
                It.IsAny<Property>(),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        await _service.CreateAsync(newProperty);

        _mockCollection.Verify(
            c => c.InsertOneAsync(
                It.Is<Property>(p => p.Name == "New Property"),
                It.IsAny<InsertOneOptions>(),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_UpdatesProperty()
    {
        var updatedProperty = new Property
        {
            IdProperty = "1",
            Name = "Updated Property",
            Address = "Updated Address",
            Price = 350000,
            Year = 2024
        };

        var mockResult = new Mock<ReplaceOneResult>();
        mockResult.Setup(r => r.IsAcknowledged).Returns(true);
        mockResult.Setup(r => r.ModifiedCount).Returns(1);

        _mockCollection
            .Setup(c => c.ReplaceOneAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<Property>(),
                It.IsAny<ReplaceOptions>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockResult.Object);

        await _service.UpdateAsync("1", updatedProperty);

        _mockCollection.Verify(
            c => c.ReplaceOneAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.Is<Property>(p => p.Name == "Updated Property"),
                It.IsAny<ReplaceOptions>(),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task RemoveAsync_DeletesProperty()
    {
        var mockResult = new Mock<DeleteResult>();
        mockResult.Setup(r => r.IsAcknowledged).Returns(true);
        mockResult.Setup(r => r.DeletedCount).Returns(1);

        _mockCollection
            .Setup(c => c.DeleteOneAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockResult.Object);

        await _service.RemoveAsync("1");

        _mockCollection.Verify(
            c => c.DeleteOneAsync(
                It.IsAny<FilterDefinition<Property>>(),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }
}

