using PMHelpDesk.Models.Ticket;
using PMHelpDesk.Repo;
using PMHelpDesk.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PMHelpDesk.Service
{
    public class TicketService : ITicketService
    {
        private IRepository<Ticket> brandRepository;

        public TicketService(IRepository<Ticket> brandRepository)
        {
            this.brandRepository = brandRepository;
        }

        public async Task<IEnumerable<Ticket>> GetAllAsync()
        {
            return await brandRepository.GetAllAsync();
        }

        public async Task<Ticket> Get(int id)
        {
            return await brandRepository.GetAsync(id);
        }

        public IEnumerable<Ticket> AllIncluding(params Expression<Func<Ticket, object>>[] includeProperties)
        {
            return brandRepository.AllIncluding(includeProperties);
        }

        public async Task<IEnumerable<Ticket>> AllIncludingAsync(params Expression<Func<Ticket, object>>[] includeProperties)
        {
            return await brandRepository.AllIncludingAsync(includeProperties);
        }

        public async Task<Ticket> InsertAsync(Ticket entity)
        {
            await brandRepository.InsertAsync(entity);
            return entity;
        }

        public async Task<int> UpdateAsync(Ticket entity)
        {
            return await brandRepository.UpdateAsync(entity);
        }

        public async Task<int> DeleteAsync(int id)
        {
            Ticket entity = await Get(id);
            return await brandRepository.DeleteAsync(entity);
        }

    }
}
