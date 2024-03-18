package app.movies.Movies.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import app.movies.Movies.Model.Watchlist;

@Repository
public interface WatchlistRepo extends MongoRepository<Watchlist, ObjectId> {
    
}
