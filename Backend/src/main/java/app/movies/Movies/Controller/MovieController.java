package app.movies.Movies.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.movies.Movies.Model.Movie;
import app.movies.Movies.Service.MovieService;

@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin(origins = "*")
public class MovieController {
    
    @Autowired
    private MovieService movieService;
    
    @GetMapping
    public ResponseEntity<List<Movie>> GetAllMovies(){
        return new ResponseEntity<List<Movie>>(movieService.AllMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movie>> GetSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieService.SingleMovie(imdbId), HttpStatus.OK);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> GetMoviesByGenre(@PathVariable String genre){
        return new ResponseEntity<List<Movie>>(movieService.MovieByGenre(genre), HttpStatus.OK);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Movie>> GetMoviesByTitle(@PathVariable String title){
        return new ResponseEntity<List<Movie>>(movieService.MoviesByTitle(title) ,HttpStatus.OK);
    }

}
