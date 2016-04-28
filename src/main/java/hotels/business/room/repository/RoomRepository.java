package hotels.business.room.repository;

import hotels.business.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findOneById(Long id);

    @Query("SELECT r FROM Room r " +
            "WHERE r.roomType = :roomType " +
            "AND r.bedType = :bedType " +
            "AND r.breakfast = :breakfast")
    Page<Room> findAllByRoomTypeAndBedTypeAndBreakfast(Pageable pageable,
                                                       @Param("roomType") Room.RoomType roomType,
                                                       @Param("bedType") Room.BedType bedType,
                                                       @Param("breakfast") Room.Breakfast breakfast);

    @Query("SELECT r FROM Room r " +
            "WHERE r.bedType = :bedType " +
            "AND r.breakfast = :breakfast")
    Page<Room> findAllByBedTypeAndBreakfast(Pageable pageable,
                                            @Param("bedType") Room.BedType bedType,
                                            @Param("breakfast") Room.Breakfast breakfast);

    @Query("SELECT r FROM Room r " +
            "WHERE r.roomType = :roomType " +
            "AND r.bedType = :bedType")
    Page<Room> findAllByRoomTypeAndBedType(Pageable pageable,
                                           @Param("roomType") Room.RoomType roomType,
                                           @Param("bedType") Room.BedType bedType);

    @Query("SELECT r FROM Room r " +
            "WHERE r.roomType = :roomType " +
            "AND r.breakfast = :breakfast")
    Page<Room> findAllByRoomTypeAndBreakfast(Pageable pageable,
                                             @Param("roomType") Room.RoomType roomType,
                                             @Param("breakfast") Room.Breakfast breakfast);

    @Query("SELECT r FROM Room r " +
            "WHERE r.roomType = :roomType")
    Page<Room> findAllByRoomType(Pageable pageable,
                                 @Param("roomType") Room.RoomType roomType);

    @Query("SELECT r FROM Room r " +
            "where r.bedType = :bedType")
    Page<Room> findAllByBedType(Pageable pageable,
                                @Param("bedType") Room.BedType bedType);

    @Query("SELECT r FROM Room r " +
            "where r.breakfast = :breakfast")
    Page<Room> findAllByBreakfast(Pageable pageable,
                                  @Param("breakfast") Room.Breakfast breakfast);

    @Query("SELECT r FROM Room r")
    Page<Room> getAll(Pageable pageable);


}
