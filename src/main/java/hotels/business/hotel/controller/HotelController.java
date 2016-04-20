package hotels.business.hotel.controller;

import hotels.business.hotel.domain.Hotel;
import hotels.business.hotel.repository.HotelRepository;
import hotels.business.hotel.service.HotelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by NicholasG on 08.04.2016.
 */
@RestController
@RequestMapping( "/hotel" )
public class HotelController {

    private static final Logger LOG = LoggerFactory.getLogger( HotelController.class );

    @Autowired
    @Qualifier( "hotelService" )
    HotelService hotelService;

    @Autowired
    HotelRepository hotelRepository;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<Hotel>> getAll() {
        LOG.info( "Getting all hotel" );
        return ResponseEntity.ok( hotelRepository.findAll() );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Hotel> addHotel( @RequestBody Hotel hotel ) {
        LOG.info( "Adding a new hotel" );
        return hotelService.add( hotel );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Hotel> editHotel( @RequestBody Hotel hotel ) {
        LOG.info( "Editing a hotel id='{}'", hotel.getId() );
        return hotelService.edit( hotel );
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> deleteHotel( @RequestParam( "id" ) Long id ) {
        LOG.info( "Deleting a hotel id='{}'", id );
        return hotelService.delete( id );
    }

}
