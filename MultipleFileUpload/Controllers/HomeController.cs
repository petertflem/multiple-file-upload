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
        public JsonResult PostFiles(IEnumerable<PostedFile> files)
        {
            // Just returning some information
            var fileInformation = files.Select(x => new {filename = x.File.FileName, title = x.Title});
            return Json(new { submitedFiles = new JavaScriptSerializer().Serialize(fileInformation) });
        }

    }
}
