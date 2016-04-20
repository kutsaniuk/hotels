package hotels.business.room.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hotels.business.hotel.domain.Hotel;

import javax.persistence.*;
import java.io.Serializable;

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

    @Id
    @Column( name = "id" )
    @GeneratedValue
    private Long id;

    @Column( name = "room_type" )
    private RoomType roomType;

    @Column( name = "room_count" )
    private int roomCount;

    @Column( name = "bed_type" )
    private Boolean bedType;

    @Column( name = "breakfast" )
    private Boolean breakfast;

    @JsonIgnore
    @ManyToOne
    @JoinColumn( name = "hotels_id", nullable = false )
    private Hotel hotel;

    public Room() {

    }

    public Room( RoomType roomType, int roomCount, Boolean bedType, Boolean breakfast ) {
        this.roomType = roomType;
        this.roomCount = roomCount;
        this.bedType = bedType;
        this.breakfast = breakfast;
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

    public Boolean getBreakfast() {
        return breakfast;
    }

    public void setBreakfast( Boolean breakfast ) {
        this.breakfast = breakfast;
    }

    public Boolean getBedType() {
        return bedType;
    }

    public void setBedType( Boolean bedType ) {
        this.bedType = bedType;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel( Hotel hotel ) {
        this.hotel = hotel;
    }
}
