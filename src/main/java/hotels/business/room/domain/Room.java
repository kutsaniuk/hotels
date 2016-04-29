package hotels.business.room.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hotels.business.hotel.domain.Hotel;
import hotels.business.image.domain.Image;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by kutsaniuk on 11.03.16.
 */

@Entity
@Table( name = "rooms" )
public class Room implements Serializable {

    public enum RoomType {
        LUX( "LUX" ),
        ECONOMIC( "ECONOMIC" ),
        PRESIDENT( "PRESIDENT" );

        private final String roomType;

        RoomType( String roomType ) {
            this.roomType = roomType;
        }

        @Override
        public String toString() {
            return roomType;
        }
    }

    public enum BedType {
        SINGLE( "SINGLE" ),
        DOUBLE( "DOUBLE" );

        private final String bedType;

        BedType( String bedType ) {
            this.bedType = bedType;
        }

        @Override
        public String toString() {
            return bedType;
        }
    }

    @Id
    @Column( name = "id" )
    @GeneratedValue
    private Long id;

    @Column( name = "room_type" )
    private RoomType roomType;

    @Column( name = "room_count" )
    private int roomCount;

    @Column( name = "bed_type" )
    private BedType bedType;

    @Column( name = "breakfast" )
    private boolean breakfast;

    @Column( name = "background", length = 3000000)
    private String background;

    @ManyToOne
    @JoinColumn( name = "hotels_id", nullable = false )
    private Hotel hotel;

    @JsonIgnore
    @OneToMany( targetEntity = Image.class, cascade = CascadeType.ALL, mappedBy = "room" )
    private Set<Image> images = new HashSet<>();

    public Room() {

    }

    public Room( RoomType roomType, int roomCount, BedType bedType, boolean breakfast, String background) {
        this.roomType = roomType;
        this.roomCount = roomCount;
        this.bedType = bedType;
        this.breakfast = breakfast;
        this.background = background;
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType( RoomType roomType ) {
        this.roomType = roomType;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount( int roomCount ) {
        this.roomCount = roomCount;
    }

    public boolean getBreakfast() {
        return breakfast;
    }

    public void setBreakfast( boolean breakfast ) {
        this.breakfast = breakfast;
    }

    public BedType getBedType() {
        return bedType;
    }

    public void setBedType( BedType bedType ) {
        this.bedType = bedType;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel( Hotel hotel ) {
        this.hotel = hotel;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages( Set<Image> images ) {
        this.images = images;
    }

    public boolean isBreakfast() {
        return breakfast;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }
}
