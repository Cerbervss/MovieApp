package app.movies.Movies.Model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "watchlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Watchlist {
    
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private List<String> moviesList;

    public Watchlist(List<String> list){
        this.moviesList = list;
    }
}
