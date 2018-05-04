using System;
using System.Collections.Generic;
using System.Text;

namespace PMHelpDesk.Models
{
    public interface IBaseEntity
    {
        int Id { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime? DiscontinueDate { get; set; }
    }
}
