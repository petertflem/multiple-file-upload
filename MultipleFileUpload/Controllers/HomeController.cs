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
        public JsonResult PostFiles(IEnumerable<PostedFile> images, IEnumerable<PostedFile> documents)
        {
            if (images == null)
                images = new List<PostedFile>();

            if (documents == null)
                documents = new List<PostedFile>();

            // Just returning some information
            var imagesInformation = images.Select(x => new { filename = x.File.FileName, title = x.Title });
            var documentsInformation = documents.Select(x => new { filename = x.File.FileName, title = x.Title });

            return Json(new
            {
                images = new JavaScriptSerializer().Serialize(imagesInformation),
                documents = new JavaScriptSerializer().Serialize(documentsInformation)
            });
        }
    }
}
