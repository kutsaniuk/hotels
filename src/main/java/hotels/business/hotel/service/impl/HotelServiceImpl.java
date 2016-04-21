package hotels.business.hotel.service.impl;

import hotels.business.hotel.domain.Hotel;
import hotels.business.hotel.repository.HotelRepository;
import hotels.business.hotel.service.HotelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Created by kutsaniuk on 11.03.16.
 */
@Component( "hotelService" )
public class HotelServiceImpl implements HotelService {

    private static final Logger LOG = LoggerFactory.getLogger( HotelServiceImpl.class );

    @Autowired
    private HotelRepository repository;

    @Override
    public ResponseEntity<Hotel> add( Hotel hotel ) {
        repository.saveAndFlush( hotel );
        LOG.info( "Hotel id='{}' has been added", hotel.getId() );
        return ResponseEntity.ok( hotel );
    }

    @Override
    public ResponseEntity<Hotel> edit( Hotel hotel ) {
        repository.saveAndFlush( hotel );
        LOG.info( "Hotel id='{}' has been edited", hotel.getId() );
        return ResponseEntity.ok( hotel );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        repository.delete( id );
        LOG.info( "Hotel id='{}' has been deleted", id );
        return ResponseEntity.ok().build();
    }

    @Override
    public Page<Hotel> search( Pageable pageable, String name, String city ) {
        if ( name == null || name.equals( "" ) ) name = "%";
        else name += "%";
        if ( city == null || city.equals( "" ) ) city = "%";
        else city += "%";

        return repository.findAllByNameAndCity( pageable, name, city );
    }

}
