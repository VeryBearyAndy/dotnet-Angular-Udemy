using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Core.Entities.identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDBContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManger)
        {
            if(!userManger.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "bob",
                    Email = "Bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                     FirstName = "Bob",
                     LastName = "Bobbity",
                     Street = "10 the Street",
                     City = "New York",
                     State = "NY",
                     ZipCode = "90210"

                    }
                };
            
            await userManger.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}