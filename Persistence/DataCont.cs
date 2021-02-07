using System;
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataCont : IdentityDbContext<AppUser>
    {
        public DataCont(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values {get; set;}
        public DbSet<Activity> Activities {get; set;}
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
            builder.Entity<Value>()
                .HasData(
                    new Value {id =1, Name="Value 101"},
                    new Value {id=2, Name="Value 102"},
                    new Value {id=3, Name= "Value 103"}

                );
            
        }
    }
}
