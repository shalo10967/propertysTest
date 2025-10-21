using Xunit;
using Moq;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using ProyectoTest.API.Controllers;
using ProyectoTest.API.Models;
using ProyectoTest.API.Services;

namespace ProyectoTest.Tests.Controllers;

public class PropertiesControllerTests
{
    private readonly Mock<PropertyService> _mockService;
    private readonly PropertiesController _controller;

    public PropertiesControllerTests()
    {
        _mockService = new Mock<PropertyService>(MockBehavior.Strict, (object)null!);
        _controller = new PropertiesController(_mockService.Object);
    }

    [Fact]
    public async Task Get_ReturnsAllProperties()
    {
        var properties = new List<Property>
        {
            new Property { IdProperty = "1", Name = "Property 1", Price = 100000 },
            new Property { IdProperty = "2", Name = "Property 2", Price = 200000 }
        };

        _mockService
            .Setup(s => s.GetAsync(null, null, null, null))
            .ReturnsAsync(properties);

        var result = await _controller.Get();

        result.Should().HaveCount(2);
        result[0].Name.Should().Be("Property 1");
        result[1].Name.Should().Be("Property 2");
    }

    [Fact]
    public async Task Get_WithFilters_ReturnsFilteredProperties()
    {
        var properties = new List<Property>
        {
            new Property { IdProperty = "1", Name = "Test Property", Price = 250000 }
        };

        _mockService
            .Setup(s => s.GetAsync("Test", "Street", 200000, 300000))
            .ReturnsAsync(properties);

        var result = await _controller.Get("Test", "Street", 200000, 300000);

        result.Should().ContainSingle();
        result[0].Name.Should().Be("Test Property");
    }

    [Fact]
    public async Task Get_ById_ReturnsProperty()
    {
        var property = new Property
        {
            IdProperty = "1",
            Name = "Test Property",
            Price = 250000
        };

        _mockService
            .Setup(s => s.GetAsync("1"))
            .ReturnsAsync(property);

        var result = await _controller.Get("1");

        result.Result.Should().BeOfType<OkObjectResult>();
        var okResult = result.Result as OkObjectResult;
        var returnedProperty = okResult!.Value as Property;
        returnedProperty!.IdProperty.Should().Be("1");
        returnedProperty.Name.Should().Be("Test Property");
    }

    [Fact]
    public async Task Get_ById_NotFound_ReturnsNotFound()
    {
        _mockService
            .Setup(s => s.GetAsync("999"))
            .ReturnsAsync((Property?)null);

        var result = await _controller.Get("999");

        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task Post_CreatesProperty_ReturnsCreatedAtAction()
    {
        var newProperty = new Property
        {
            Name = "New Property",
            Address = "123 Street",
            Price = 300000,
            Year = 2023
        };

        _mockService
            .Setup(s => s.CreateAsync(It.IsAny<Property>()))
            .Returns(Task.CompletedTask)
            .Callback<Property>(p => p.IdProperty = "1");

        var result = await _controller.Post(newProperty);

        result.Should().BeOfType<CreatedAtActionResult>();
        var createdResult = result as CreatedAtActionResult;
        createdResult!.ActionName.Should().Be(nameof(_controller.Get));
        createdResult.RouteValues!["id"].Should().Be("1");
    }

    [Fact]
    public async Task Update_ValidProperty_ReturnsNoContent()
    {
        var existingProperty = new Property
        {
            IdProperty = "1",
            Name = "Existing Property",
            Price = 200000
        };

        var updatedProperty = new Property
        {
            Name = "Updated Property",
            Address = "Updated Address",
            Price = 250000
        };

        _mockService
            .Setup(s => s.GetAsync("1"))
            .ReturnsAsync(existingProperty);

        _mockService
            .Setup(s => s.UpdateAsync("1", It.IsAny<Property>()))
            .Returns(Task.CompletedTask);

        var result = await _controller.Update("1", updatedProperty);

        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task Update_NonExistentProperty_ReturnsNotFound()
    {
        var updatedProperty = new Property
        {
            Name = "Updated Property",
            Address = "Updated Address",
            Price = 250000
        };

        _mockService
            .Setup(s => s.GetAsync("999"))
            .ReturnsAsync((Property?)null);

        var result = await _controller.Update("999", updatedProperty);

        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task Delete_ValidProperty_ReturnsNoContent()
    {
        var existingProperty = new Property
        {
            IdProperty = "1",
            Name = "Property to Delete",
            Price = 200000
        };

        _mockService
            .Setup(s => s.GetAsync("1"))
            .ReturnsAsync(existingProperty);

        _mockService
            .Setup(s => s.RemoveAsync("1"))
            .Returns(Task.CompletedTask);

        var result = await _controller.Delete("1");

        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task Delete_NonExistentProperty_ReturnsNotFound()
    {
        _mockService
            .Setup(s => s.GetAsync("999"))
            .ReturnsAsync((Property?)null);

        var result = await _controller.Delete("999");

        result.Should().BeOfType<NotFoundResult>();
    }
}

