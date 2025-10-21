using Microsoft.AspNetCore.Mvc;
using ProyectoTest.API.Models;
using ProyectoTest.API.Services;

namespace ProyectoTest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly PropertyService _propertyService;

    public PropertiesController(PropertyService propertyService) =>
        _propertyService = propertyService;

    [HttpGet]
    public async Task<List<Property>> Get(
        [FromQuery] string? name = null,
        [FromQuery] string? address = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null) =>
        await _propertyService.GetAsync(name, address, minPrice, maxPrice);

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Property>> Get(string id)
    {
        var property = await _propertyService.GetAsync(id);

        if (property is null)
        {
            return NotFound();
        }

        return property;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Property newProperty)
    {
        await _propertyService.CreateAsync(newProperty);

        return CreatedAtAction(nameof(Get), new { id = newProperty.IdProperty }, newProperty);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Property updatedProperty)
    {
        var property = await _propertyService.GetAsync(id);

        if (property is null)
        {
            return NotFound();
        }

        updatedProperty.IdProperty = property.IdProperty;

        await _propertyService.UpdateAsync(id, updatedProperty);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var property = await _propertyService.GetAsync(id);

        if (property is null)
        {
            return NotFound();
        }

        await _propertyService.RemoveAsync(id);

        return NoContent();
    }
}

