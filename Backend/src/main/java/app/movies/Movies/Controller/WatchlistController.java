package app.movies.Movies.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mongodb.lang.NonNull;

import app.movies.Movies.Model.Watchlist;

import app.movies.Movies.Service.WatchlistService;

@Controller
@RequestMapping("/api/v1/watchlist")
@CrossOrigin(origins = "*")
public class WatchlistController {
    
    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService){
        this.watchlistService = watchlistService;
    }

    @PostMapping
    public ResponseEntity<Watchlist> CreateNewWatchlist(){
        return new ResponseEntity<Watchlist>(watchlistService.NewWatchlist(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Watchlist>> GetSingleWatchlist(@NonNull @PathVariable ObjectId id){
        return new ResponseEntity<Optional<Watchlist>>(watchlistService.SingleWatchlist(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> PutUpdateWatchlist(@NonNull @RequestBody Map<String, List<String>> payload, @PathVariable ObjectId id){
        watchlistService.UpdateWatchlist(id, payload.get("list"));
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
