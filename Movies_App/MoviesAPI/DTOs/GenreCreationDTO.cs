using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class GenreCreationDTO
    {
        
        [Required(ErrorMessage = "{0} field is required for the request")]
        [FirstLetterUppercase]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
