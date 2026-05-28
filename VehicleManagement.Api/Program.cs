using VehicleManagement.Application.Contracts;
using VehicleManagement.Application.Services;
using VehicleManagement.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
            "http://127.0.0.1:3000"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IVehicleService, VehicleService>();
builder.Services.AddSingleton<IReminderService, ReminderService>();

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow }))
    .WithName("HealthCheck")
    .WithOpenApi();

app.MapGet("/api/vehicles", (IVehicleService vehicleService) => Results.Ok(vehicleService.GetVehicles()))
    .WithName("GetVehicles")
    .WithOpenApi();

app.MapPost("/api/vehicles", (CreateVehicleRequest request, IVehicleService vehicleService) =>
{
    var vehicle = vehicleService.CreateVehicle(request);
    return Results.Created($"/api/vehicles/{vehicle.Id}", vehicle);
})
    .WithName("CreateVehicle")
    .WithOpenApi();

app.MapGet("/api/reminders", (IReminderService reminderService) => Results.Ok(reminderService.GetReminders()))
    .WithName("GetReminders")
    .WithOpenApi();

app.MapPost("/api/reminders", (CreateReminderRequest request, IReminderService reminderService) =>
{
    var reminder = reminderService.CreateReminder(request);
    return Results.Created($"/api/reminders/{reminder.Id}", reminder);
})
    .WithName("CreateReminder")
    .WithOpenApi();

app.Run();
