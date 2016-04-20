package hotels.business.room.repository;

import hotels.business.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomRepository extends JpaRepository<Room, Long> {
}
