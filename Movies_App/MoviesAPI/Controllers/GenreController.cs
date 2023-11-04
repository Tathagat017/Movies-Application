using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MoviesAPI.Entities;

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MoviesAPI.Filters;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using AutoMapper;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("/genres")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GenreController : ControllerBase
    {




        private readonly ILogger<GenreController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenreController(ILogger<GenreController> logger,ApplicationDbContext context,IMapper mapper)
        {

            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet] //api/genres
        // [HttpGet("list")]
        //[ResponseCache(Duration=50)]
        // [ServiceFilter(typeof(MyActionFilter))]
        public async Task<ActionResult<List<GenreDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            //logger to console
            logger.LogInformation("Getting all genres");


            //Pagination
            var queryable = context.Genres.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var genres = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<GenreDTO>>(genres);
         

            return mapper.Map<List<GenreDTO>>(genres);

        }


        [HttpGet("{Id:int}")]
        public async Task<ActionResult<GenreDTO>> GetGenreById([BindRequired] int Id)


        {


            var genre = await context.Genres.FirstOrDefaultAsync(x=>x.Id==Id);

            if (genre == null) { return NotFound(); }

            return mapper.Map<GenreDTO>(genre);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            context.Genres.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{Id:int}")]
        public async Task<ActionResult> Put(int Id,[FromBody] GenreCreationDTO genreCreationDTO)
        {

            var genre = await context.Genres.FirstOrDefaultAsync(x =>x.Id==Id);
            if (genre == null) { return NotFound(); }
            genre = mapper.Map(genreCreationDTO, genre);
            await context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{Id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {

           var exists = await context.Genres.AnyAsync(x => x.Id==Id);

            if (!exists) { return NotFound(); }
            context.Remove(new Genre(){ Id=Id});
            await context.SaveChangesAsync();
            return NoContent();

        }
    }
}
