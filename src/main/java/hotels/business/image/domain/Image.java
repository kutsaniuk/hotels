package hotels.business.image.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hotels.business.hotel.domain.Hotel;
import hotels.business.room.domain.Room;

import javax.persistence.*;

/**
 * Created by NicholasG on 25.04.2016.
 */
@Entity
@Table( name = "images" )
public class Image {

    @Id
    @GeneratedValue
    @Column( name = "id" )
    private Long id;

    @JsonIgnore
    @Column( name = "image_as_string", length = 3000000 )
    private String imageAsString;

    @Transient
    private byte[] decodedImage;

    @ManyToOne
    @JoinColumn( name = "rooms_id" )
    private Room room;

    @ManyToOne
    @JoinColumn( name = "hotels_id" )
    private Hotel hotel;

    public Image() {
    }

    public Image( String imageAsString ) {
        this.imageAsString = imageAsString;
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public String getImageAsString() {
        return imageAsString;
    }

    public void setImageAsString( String imageAsString ) {
        this.imageAsString = imageAsString;
    }

    public byte[] getDecodedImage() {
        return decodedImage;
    }

    public void setDecodedImage( byte[] decodedImage ) {
        this.decodedImage = decodedImage;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom( Room room ) {
        this.room = room;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel( Hotel hotel ) {
        this.hotel = hotel;
    }

}
