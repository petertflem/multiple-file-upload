using System.Web;

namespace MultipleFileUpload.Models
{
    public class PostedFile
    {
        public string Title { get; set; }
        public HttpPostedFileBase File { get; set; }
    }
}