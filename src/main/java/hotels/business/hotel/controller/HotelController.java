package hotels.business.hotel.controller;

import hotels.business.hotel.domain.Hotel;
import hotels.business.hotel.repository.HotelRepository;
import hotels.business.hotel.service.HotelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    public ResponseEntity<Page<Hotel>> search( Pageable pageable,
                                               String name,
                                               String city ) {
        LOG.info( "Getting all hotels" );
        Page<Hotel> page = hotelService.search( pageable, name, city );
        return ResponseEntity.ok( page );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Hotel> addHotel( @RequestBody Hotel hotel ) {
        LOG.info( "Adding a new hotel" );
        return hotelService.add( hotel );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
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

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Hotel> getOne( @PathVariable Long id ) {
        return ResponseEntity.ok( hotelRepository.findOne( id ) );
    }

    @RequestMapping(
            value = "/logo",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> getLogo( @RequestParam( "id" ) Long id ) {
        return hotelService.getLogo( id );
    }

    @RequestMapping(
            value = "/logo",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> updateLogo( @RequestParam( "id" ) Long id,
                                            @RequestParam( "file" ) MultipartFile image ) {
        LOG.info( "Updating hotel id='{}' image", id );

        return hotelService.updateLogo( id, image );
    }

}
