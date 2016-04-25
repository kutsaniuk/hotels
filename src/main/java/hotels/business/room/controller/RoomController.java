package hotels.business.room.controller;

import hotels.business.image.domain.Image;
import hotels.business.room.domain.Room;
import hotels.business.room.repository.RoomRepository;
import hotels.business.room.service.RoomService;
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

import java.util.List;
import java.util.Set;

/**
 * Created by NicholasG on 18.04.2016.
 */
@RestController
@RequestMapping( "/room" )
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
    public ResponseEntity<Page<Room>> search( Pageable pageable,
                                              String roomType,
                                              String bedType,
                                              String breakfast) {
        LOG.info( "Getting all rooms" );
        Page<Room> page = roomService.search( pageable, roomType, bedType, breakfast );
        return ResponseEntity.ok( page );
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

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Room> getOne( @PathVariable Long id ) {
        return ResponseEntity.ok( roomRepository.findOne( id ) );
    }

    @RequestMapping(
            value = "/images",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Set<Image>> getImages( @RequestParam( "id" ) Long id ) {
        LOG.info( "Getting room's id'{}' images", id );
        return roomService.getAllImages( id );
    }

    @RequestMapping(
            value = "/images",
            method = RequestMethod.POST
    )
    public ResponseEntity<Void> addImage( @RequestParam( "id" ) Long id,
                                          @RequestParam( "file" ) MultipartFile image ) {
        LOG.info( "Adding an image into room id='{}'", id );
        return roomService.addImage( id, image );
    }

    @RequestMapping(
            value = "/images",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<Void> removeImage( @RequestParam( "id" ) Long imageId ) {
        LOG.info( "Deleting an image id='{}'", imageId );
        return roomService.removeImage( imageId );
    }

}
