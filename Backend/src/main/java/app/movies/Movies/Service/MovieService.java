package app.movies.Movies.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.movies.Movies.Model.Movie;
import app.movies.Movies.Repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> AllMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> SingleMovie(String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public List<Movie> MovieByGenre(String genre){
        List<Movie> movies = movieRepository.findAll();
        List<Movie> moviesCorrect = new ArrayList<>();

        genre = genre.substring(0,1).toUpperCase() + genre.substring(1).toLowerCase();


        for(int i = 0; i < movies.size(); i++){
            if(movies.get(i).getGenres().contains(genre)){
                moviesCorrect.add(movies.get(i));
            }
        }
        return moviesCorrect;
    }

    public List<Movie> MoviesByTitle(String title){
        title = title.toLowerCase().trim();
        List<Movie> movies = movieRepository.findAll();
        List<Movie> moviesCorrect = new ArrayList<>();

        for(int i = 0; i < movies.size(); i++){
            String title2 = movies.get(i).getTitle().toLowerCase().trim();
            boolean equal = true;

            for(int j = 0; j < title.length(); j++){
                if(title.charAt(j) != title2.charAt(j)) equal = false;
            }

            if(equal && title2 != null){
                moviesCorrect.add(movies.get(i));
            }
        }

        return moviesCorrect;
    }

}
