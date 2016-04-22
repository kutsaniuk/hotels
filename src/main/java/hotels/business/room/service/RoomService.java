package hotels.business.room.service;

import hotels.business.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomService {

    ResponseEntity<Room> add( Room room );

    ResponseEntity<Room> edit( Room room );

    ResponseEntity<Void> delete( Long id );

    Page<Room> search( Pageable pageable, int roomType, String bedType, String breakfast );

}
