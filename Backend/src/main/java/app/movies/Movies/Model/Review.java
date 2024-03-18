package app.movies.Movies.Model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String body;
    private LocalDateTime dateCreation;
    private LocalDateTime dateUpdate;


    public Review(String body, LocalDateTime dateCreation, LocalDateTime dateUpdate){
        this.body = body;
        this.dateCreation = dateCreation;
        this.dateUpdate = dateUpdate;
    }
}
