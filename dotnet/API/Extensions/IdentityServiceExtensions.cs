using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration Config)
        {
            services.AddDbContext<AppIdentityDbContext>(opt => {
                opt.UseSqlite(Config.GetConnectionString("IdentityConnection"));
            });

            services.AddIdentityCore<AppUser>(opt => {
                //can add identity option here
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            

            return services;
        }
    }
}