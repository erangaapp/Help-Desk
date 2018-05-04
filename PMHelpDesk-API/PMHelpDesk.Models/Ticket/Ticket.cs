using System;
using System.Collections.Generic;
using System.Text;

namespace PMHelpDesk.Models.Ticket
{
    public class Ticket : BaseEntity
    {
        public string Sender { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
    }
}
