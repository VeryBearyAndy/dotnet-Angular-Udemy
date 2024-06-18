using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Identity;
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
            return services;
        }
    }
}