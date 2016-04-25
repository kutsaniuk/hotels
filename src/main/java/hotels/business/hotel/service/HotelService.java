package hotels.business.hotel.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import hotels.business.hotel.domain.Hotel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface HotelService {

    ResponseEntity<Hotel> add( Hotel hotel );

    ResponseEntity<Hotel> edit( Hotel hotel );

    ResponseEntity<Void> delete( Long id );

    Page<Hotel> search( Pageable pageable, String name, String city );

    ResponseEntity<String> getLogo( Long id );

    ResponseEntity<Void> updateLogo( Long id, MultipartFile image );
}
