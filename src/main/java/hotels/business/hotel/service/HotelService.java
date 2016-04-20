package hotels.business.hotel.service;

import hotels.business.hotel.domain.Hotel;
import org.springframework.http.ResponseEntity;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface HotelService {

    ResponseEntity<Hotel> add( Hotel hotel );

    ResponseEntity<Hotel> edit( Hotel hotel );

    ResponseEntity<Void> delete( Long id );

}