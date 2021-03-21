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
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }
         public DbSet<Photo> Photos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Value>()
                .HasData(
                    new Value { id = 1, Name = "Value 101" },
                    new Value { id = 2, Name = "Value 102" },
                    new Value { id = 3, Name = "Value 103" }

                );
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>(x => x.HasOne(ua => ua.AppUser)
            .WithMany(a => a.UserActivities)
            .HasForeignKey(u => u.AppUserId));
              builder.Entity<UserActivity>(x => x.HasOne(ua => ua.Activity)
            .WithMany(a => a.UserActivities)
            .HasForeignKey(u => u.ActivityId));
        }
    }
}
