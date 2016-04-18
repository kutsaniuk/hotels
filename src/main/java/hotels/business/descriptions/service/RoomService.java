package hotels.business.descriptions.service;

import hotels.business.descriptions.domain.Room;
import org.springframework.http.ResponseEntity;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomService {

    ResponseEntity<Room> add( Room room );

    ResponseEntity<Room> edit( Room room );

    ResponseEntity<Void> delete( Long id );

}
