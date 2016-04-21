package hotels.business.hotel.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import hotels.business.hotel.domain.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query( "SELECT h FROM Hotel h " +
            "WHERE LOWER(h.name) LIKE LOWER(:name) " +
            "AND LOWER(h.city) LIKE LOWER(:city) " )
    Page<Hotel> findAllByNameAndCity(
            Pageable pageable,
            @Param( "name" ) String name,
            @Param( "city" ) String city );

}
