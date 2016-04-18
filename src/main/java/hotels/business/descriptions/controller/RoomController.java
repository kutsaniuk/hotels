package hotels.business.descriptions.controller;

import hotels.business.descriptions.domain.Room;
import hotels.business.descriptions.repository.RoomRepository;
import hotels.business.descriptions.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by NicholasG on 18.04.2016.
 */
@RestController
@RequestMapping( "/rooms" )
public class RoomController {

    private static final Logger LOG = LoggerFactory.getLogger( RoomController.class );

    @Autowired
    @Qualifier( "roomService" )
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<Room>> getAll() {
        LOG.info( "Getting all rooms" );
        return ResponseEntity.ok( roomRepository.findAll() );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Room> addRoom( @RequestBody Room room ) {
        LOG.info( "Adding a new room" );
        return roomService.add( room );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Room> editRoom( @RequestBody Room room ) {
        LOG.info( "Editing room id'{}'", room.getId() );
        return roomService.edit( room );
    }

    @RequestMapping(
            method = RequestMethod.DELETE
    )
    public ResponseEntity<Void> deleteRoom( @RequestParam( "id" ) Long id ) {
        LOG.info( "Deleting room id='{}'", id );
        return roomService.delete( id );
    }

}
