package hotels.business.descriptions.repository;

import hotels.business.descriptions.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomRepository extends JpaRepository<Room, Long> {
}
