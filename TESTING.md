# Testing Guide

This project includes comprehensive unit tests for both frontend and backend.

## Frontend Testing (Vitest + React Testing Library)

### Running Tests

```bash
cd apps/web

# Run tests once
pnpm test

# Run tests in watch mode
pnpm test watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage


### Testing Tools

- **Vitest**: Fast unit test framework
- **React Testing Library**: Test React components
- **jsdom**: Browser environment simulation
- **@testing-library/user-event**: Simulate user interactions

## Backend Testing (xUnit + Moq)

### Running Tests

```bash
cd apps/backend/ProyectoTest.Tests

# Run all tests
dotnet test

# Run with detailed output
dotnet test --logger "console;verbosity=detailed"

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

### Test Structure

Tests are organized by type:
- Service tests: `Services/*Tests.cs`
- Controller tests: `Controllers/*Tests.cs`

### Testing Tools

- **xUnit**: Modern testing framework for .NET
- **Moq**: Mocking framework
- **FluentAssertions**: Fluent assertion library

