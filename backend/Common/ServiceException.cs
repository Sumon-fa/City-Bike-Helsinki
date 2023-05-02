namespace Backend.Common;

using System.Net;

public class ServiceException : Exception
{
    public HttpStatusCode StatusCode { get; set; }
    public override string Message { get; } = null!;

    public ServiceException()
    {
        StatusCode = HttpStatusCode.InternalServerError;
        Message = "An error occurred.";
    }

    public ServiceException(HttpStatusCode statusCode, string message)
    {
        StatusCode = statusCode;
        Message = message;
    }

    public ServiceException(string? message) : base(message)
    {
    }

    public ServiceException(string? message, Exception? innerException) : base(message, innerException)
    {
    }

    public static ServiceException NotFound(string message = "Id is not found")
    {
        return new ServiceException(HttpStatusCode.NotFound, message);
    }

    public static ServiceException Unauthorized(string message = "Unauthorized")
    {
        return new ServiceException(HttpStatusCode.Unauthorized, message);
    }

    public static ServiceException BadRequest(string message = "Bad Request")
    {
        return new ServiceException(HttpStatusCode.BadRequest, message);
    }
}
