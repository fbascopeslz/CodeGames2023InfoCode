using Comments.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Comments.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //EmailProvider.SendEmail("", "Comments");
            return View();
        }

        public async Task<string> SendEmail(string message, string user) 
        {
            
            EmailProvider.SendEmail(message, user);
            return "";
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}