using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MultipleFileUpload.Models;
using System.Linq;

namespace MultipleFileUpload.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        
        //
        // POST: /Home/PostFiles

        [HttpPost]
        public JsonResult PostFiles(List<PostedFile> images)
        {
            if (images == null)
                images = new List<PostedFile>();

            // Remove empty image fields
            images.RemoveAll(x => x.File == null);

            // Just returning some information
            var imagesInformation = images.Select(x => new { filename = x.File.FileName, title = x.Title });
            
            return Json(new
            {
                images = new JavaScriptSerializer().Serialize(imagesInformation),
            });
        }
    }
}
