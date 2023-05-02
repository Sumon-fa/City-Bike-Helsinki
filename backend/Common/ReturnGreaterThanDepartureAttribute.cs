namespace Backend.Common;

using Backend.DTOs;
using System.ComponentModel.DataAnnotations;

public class ReturnGreaterThanDepartureAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var journey = (JourneyDTO)validationContext.ObjectInstance;

        if (journey.Return < journey.Departure.AddMinutes(9))
        {
            return new ValidationResult("Return time must be greater than departure time", new[] { "Return" });
        }

        return ValidationResult.Success;
    }
}
