using PMHelpDesk.Models.Ticket;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PMHelpDesk.Service.Abstract
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllAsync();
        Task<Ticket> Get(int id);
        IEnumerable<Ticket> AllIncluding(params Expression<Func<Ticket, object>>[] includeProperties);
        Task<IEnumerable<Ticket>> AllIncludingAsync(params Expression<Func<Ticket, object>>[] includeProperties);
        Task<Ticket> InsertAsync(Ticket entity);
        Task<int> UpdateAsync(Ticket entity);
        Task<int> DeleteAsync(int id);
    }
}
