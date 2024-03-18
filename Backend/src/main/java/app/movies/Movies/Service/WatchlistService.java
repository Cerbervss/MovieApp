package app.movies.Movies.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import app.movies.Movies.Repository.WatchlistRepo;
import app.movies.Movies.Model.Watchlist;

@Service
public class WatchlistService {

    private final WatchlistRepo watchlistRepo;

    @Autowired
    public WatchlistService(WatchlistRepo watchlistRepo){
        this.watchlistRepo = watchlistRepo;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @SuppressWarnings("null")
    public Optional<Watchlist> SingleWatchlist(ObjectId id){
        return watchlistRepo.findById(id);        
    }

    public void UpdateWatchlist(ObjectId id, List<String> body){
        mongoTemplate.update(Watchlist.class)
            .matching(Criteria.where("id").is(id))
            .apply(new Update().set("moviesList", body))
            .all();  
        
    }

    public Watchlist NewWatchlist(){
        List<String> list = new ArrayList<>();
        return watchlistRepo.insert(new Watchlist(list));
    }
    
}
