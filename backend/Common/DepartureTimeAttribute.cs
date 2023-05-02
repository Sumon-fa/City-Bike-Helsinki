namespace Backend.Common;

using System.ComponentModel.DataAnnotations;

public class DepartureTimeAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
        {
            return new ValidationResult("Departure must be at least 10 minutes after the current time.");
        }

        var departure = (DateTime)value;
        var minDepartureTime = DateTime.Now.AddMinutes(10);

        if (departure < minDepartureTime)
        {
            return new ValidationResult("Departure must be at least 10 minutes after the current time.");
        }

        return ValidationResult.Success!;
    }
}
