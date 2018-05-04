using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using ISVC = PMHelpDesk.Service.Abstract;
using MD = PMHelpDesk.Models.Ticket;
using PMHelpDesk_API.Models.TicketViewModels;

namespace PMHelpDesk_API.Controllers
{
    [Produces("application/json")]
    [Route("api/Ticket")]
    public class TicketController : Controller
    {
        private readonly ISVC.ITicketService ticketService;

        public TicketController(ISVC.ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        // POST: Brands/Create
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TicketCreateViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var _entity = await ticketService.InsertAsync(new MD.Ticket()
                    {
                        CreatedDate = DateTime.Now,
                        DiscontinueDate = null,
                        Body = model.Body,
                        Sender = model.Sender,
                        Subject = model.Subject

                    });

                    return Ok();
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");

                return BadRequest(ModelState);
            }

        }


    }
}