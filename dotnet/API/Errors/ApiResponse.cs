using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SQLitePCL;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 => "A bad request, you have made",
                401 => "authorized, you are not",
                404 => "resource found, it was not",
                500 => "Errors are the path to the dark side, Errors lead to anger. Angler leads to hate. Hate leads to career change",
                _ => null
            };
        }
    }
}