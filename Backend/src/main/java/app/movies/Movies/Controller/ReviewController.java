package app.movies.Movies.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.movies.Movies.Model.Review;
import app.movies.Movies.Service.ReviewService;

@RestController
@RequestMapping("/api/v1/review")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@NonNull @RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(reviewService.createNewReview(payload.get("reviewBody"),payload.get("imdbId")), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public void updateReviewById(@NonNull @RequestBody Map<String, String> payload, @PathVariable ObjectId id){
        reviewService.updateReview(payload.get("reviewBody"), id);
    }

    @GetMapping("/{id}")
    public Optional<Review> getOneReview(@NonNull @PathVariable ObjectId id){
        return reviewService.getSingleReview(id);
    }

    @GetMapping("/all")
    public List<Review> getAllReviews(){
        return reviewService.getReviews();
    }

    @DeleteMapping("/{id}")
    public void deleteOneReview(@NonNull @PathVariable ObjectId id){
        reviewService.deleteReview(id);
    }
}
