package hotels.business.descriptions.domain;

import hotels.business.hotels.domain.Hotel;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by kutsaniuk on 11.03.16.
 */

@Entity
@Table
public class Description implements Serializable{

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Column(name = "roomType")
    private String roomType;

    @Column(name = "roomCount")
    private int roomCount;

    @Column(name = "bedType")
    private String bedType;

    @Column(name = "breakfast")
    private String breakfast;


    @ManyToOne
    @JoinColumn(name = "hotelsId", nullable = false)
    private Hotel hotel;

    public Description() {

    }

    public Description(String roomType, int roomCount, String bedType, String breakfast) {
        this.roomType = roomType;
        this.roomCount = roomCount;
        this.bedType = bedType;
        this.breakfast = breakfast;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public String getBreakfast() {
        return breakfast;
    }

    public void setBreakfast(String breakfast) {
        this.breakfast = breakfast;
    }

    public String getBedType() {
        return bedType;
    }

    public void setBedType(String bedType) {
        this.bedType = bedType;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}
