using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelpDesk.Models.Account;
using PMHelpDesk.Models.Ticket;
using System;
using System.Collections.Generic;
using System.Text;

using MAP = PMHelpDesk.Data.Mappings;

namespace PMHelpDesk.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region TICKETMAP

            new MAP.TicketMAP(builder.Entity<Ticket>());
            
            #endregion

        }
    }
}
