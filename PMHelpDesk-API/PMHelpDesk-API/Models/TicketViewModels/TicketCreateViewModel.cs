using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMHelpDesk_API.Models.TicketViewModels
{
    public class TicketCreateViewModel
    {
        public string Sender { get; set; }
        public string Body { get; set; }
        public string Subject { get; set; }
    }
}
