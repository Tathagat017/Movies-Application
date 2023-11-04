using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        

        public DateTime DateOfBirth { get; set; }

        public string Biography { get; set; }

        public string Picture { get; set; }


    }
}
