package hotels.business.room.repository;

import hotels.business.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query( "SELECT r FROM Room r " +
            "WHERE LOWER(r.roomType) LIKE LOWER(:roomType) " +
            "AND LOWER(r.bedType) LIKE LOWER(:bedType) " +
            "AND LOWER(r.breakfast) LIKE LOWER(:breakfast)" )
    Page<Room> findAll( Pageable pageable,
                        @Param( "roomType" ) String roomType,
                        @Param( "bedType" ) String bedType,
                        @Param( "breakfast" ) String breakfast );

}
