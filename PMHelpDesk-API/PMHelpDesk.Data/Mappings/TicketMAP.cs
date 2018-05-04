using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

using MD = PMHelpDesk.Models;

namespace PMHelpDesk.Data.Mappings
{
    public class TicketMAP
    {
        public TicketMAP(EntityTypeBuilder<MD.Ticket.Ticket> entityBuilder)
        {
            entityBuilder.HasKey(t => t.Id);
            entityBuilder.Property(t => t.CreatedDate).IsRequired();
            entityBuilder.Property(t => t.Sender).IsRequired();
        }
    }
}
