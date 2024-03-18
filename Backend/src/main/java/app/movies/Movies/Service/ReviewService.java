package app.movies.Movies.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import app.movies.Movies.Model.Movie;
import app.movies.Movies.Model.Review;
import app.movies.Movies.Repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService (ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createNewReview (String reviewBody, String imdbId){
        Review review = reviewRepository.insert(new Review(reviewBody, LocalDateTime.now(), LocalDateTime.now()));
        
        mongoTemplate.update(Movie.class)
            .matching(Criteria.where("imdbId").is(imdbId))
            .apply(new Update().push("reviewIds").value(review))
            .first();

        return review;
    }

    public void updateReview(String body, ObjectId id){ 
        mongoTemplate.update(Review.class)
            .matching(Criteria.where("id").is(id))
            .apply(new Update().set("body", body).set("dateUpdate", LocalDateTime.now()))
            .all();        
    }

    @SuppressWarnings("null")
    public Optional<Review> getSingleReview(ObjectId id){
        return reviewRepository.findById(id);
    }

    public List<Review> getReviews(){
        return reviewRepository.findAll();
    }

    @SuppressWarnings("null")
    public void deleteReview(ObjectId id){
        reviewRepository.deleteById(id);

        mongoTemplate.update(Movie.class)
        .matching(Criteria.where("reviewIds.id").is(id))
        .apply(new Update().pull("reviewIds.id", id))
        .all();
    }
}
