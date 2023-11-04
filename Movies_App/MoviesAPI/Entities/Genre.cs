
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MoviesAPI.Validations;

namespace MoviesAPI.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="{0} field is required for the request")]
        [FirstLetterUppercase]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
