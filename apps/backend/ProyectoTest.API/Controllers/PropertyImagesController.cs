using Microsoft.AspNetCore.Mvc;
using ProyectoTest.API.Models;
using ProyectoTest.API.Services;

namespace ProyectoTest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyImagesController : ControllerBase
{
    private readonly PropertyImageService _propertyImageService;

    public PropertyImagesController(PropertyImageService propertyImageService) =>
        _propertyImageService = propertyImageService;

    [HttpGet]
    public async Task<List<PropertyImage>> Get() =>
        await _propertyImageService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<PropertyImage>> Get(string id)
    {
        var propertyImage = await _propertyImageService.GetAsync(id);

        if (propertyImage is null)
        {
            return NotFound();
        }

        return propertyImage;
    }

    [HttpGet("property/{propertyId:length(24)}")]
    public async Task<List<PropertyImage>> GetByPropertyId(string propertyId) =>
        await _propertyImageService.GetByPropertyIdAsync(propertyId);

    [HttpPost]
    public async Task<IActionResult> Post(PropertyImage newPropertyImage)
    {
        await _propertyImageService.CreateAsync(newPropertyImage);

        return CreatedAtAction(nameof(Get), new { id = newPropertyImage.IdPropertyImage }, newPropertyImage);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, PropertyImage updatedPropertyImage)
    {
        var propertyImage = await _propertyImageService.GetAsync(id);

        if (propertyImage is null)
        {
            return NotFound();
        }

        updatedPropertyImage.IdPropertyImage = propertyImage.IdPropertyImage;

        await _propertyImageService.UpdateAsync(id, updatedPropertyImage);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var propertyImage = await _propertyImageService.GetAsync(id);

        if (propertyImage is null)
        {
            return NotFound();
        }

        await _propertyImageService.RemoveAsync(id);

        return NoContent();
    }
}

