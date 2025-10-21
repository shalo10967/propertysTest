using Microsoft.AspNetCore.Mvc;
using ProyectoTest.API.Models;
using ProyectoTest.API.Services;

namespace ProyectoTest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyTracesController : ControllerBase
{
    private readonly PropertyTraceService _propertyTraceService;

    public PropertyTracesController(PropertyTraceService propertyTraceService) =>
        _propertyTraceService = propertyTraceService;

    [HttpGet]
    public async Task<List<PropertyTrace>> Get() =>
        await _propertyTraceService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<PropertyTrace>> Get(string id)
    {
        var propertyTrace = await _propertyTraceService.GetAsync(id);

        if (propertyTrace is null)
        {
            return NotFound();
        }

        return propertyTrace;
    }

    [HttpGet("property/{propertyId:length(24)}")]
    public async Task<List<PropertyTrace>> GetByPropertyId(string propertyId) =>
        await _propertyTraceService.GetByPropertyIdAsync(propertyId);

    [HttpPost]
    public async Task<IActionResult> Post(PropertyTrace newPropertyTrace)
    {
        await _propertyTraceService.CreateAsync(newPropertyTrace);

        return CreatedAtAction(nameof(Get), new { id = newPropertyTrace.IdPropertyTrace }, newPropertyTrace);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, PropertyTrace updatedPropertyTrace)
    {
        var propertyTrace = await _propertyTraceService.GetAsync(id);

        if (propertyTrace is null)
        {
            return NotFound();
        }

        updatedPropertyTrace.IdPropertyTrace = propertyTrace.IdPropertyTrace;

        await _propertyTraceService.UpdateAsync(id, updatedPropertyTrace);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var propertyTrace = await _propertyTraceService.GetAsync(id);

        if (propertyTrace is null)
        {
            return NotFound();
        }

        await _propertyTraceService.RemoveAsync(id);

        return NoContent();
    }
}

