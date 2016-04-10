package hotels.business.hotels.repository;

import hotels.business.hotels.domain.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
