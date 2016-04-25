package hotels.business.room.service;

import hotels.business.image.domain.Image;
import hotels.business.room.domain.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface RoomService {

    ResponseEntity<Room> add( Room room );

    ResponseEntity<Room> edit( Room room );

    ResponseEntity<Void> delete( Long id );

    Page<Room> search( Pageable pageable, String roomType, String bedType, String breakfast );

    ResponseEntity<Set<Image>> getAllImages( Long id );

    ResponseEntity<Void> addImage( Long id, MultipartFile image );

    ResponseEntity<Void> removeImage( Long imageId );
}
