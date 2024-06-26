using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult getNotFoundRequest()
        {
            var thing = _context.Products.Find(42);
            
            if(thing == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult getServerError()
        {

            var thing = _context.Products.Find(42);
            
            var thingToString = thing.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult getBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult getNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}