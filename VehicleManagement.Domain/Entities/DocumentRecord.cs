using System;

namespace VehicleManagement.Domain.Entities;

public sealed class DocumentRecord
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid UserId { get; init; }
    public Guid? VehicleId { get; init; }
    public string FileName { get; init; } = string.Empty;
    public string ContentType { get; init; } = string.Empty;
    public string BlobPath { get; init; } = string.Empty;
    public DateTime UploadedAt { get; init; } = DateTime.UtcNow;
    public string Notes { get; init; } = string.Empty;
}
