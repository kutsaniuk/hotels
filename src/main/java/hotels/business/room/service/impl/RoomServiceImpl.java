package hotels.business.room.service.impl;

import hotels.business.image.domain.Image;
import hotels.business.image.repository.ImageRepository;
import hotels.business.room.domain.Room;
import hotels.business.room.repository.RoomRepository;
import hotels.business.room.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by kutsaniuk on 11.03.16.
 */
@Component( "roomService" )
public class RoomServiceImpl implements RoomService {

    private static final Logger LOG = LoggerFactory.getLogger( RoomServiceImpl.class );

    @Autowired
    private RoomRepository repository;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public ResponseEntity<Room> add( Room room ) {
        LOG.info( "Room id='{}' has been added", room.getId() );
        return ResponseEntity.ok( repository.saveAndFlush( room ) );
    }

    @Override
    public ResponseEntity<Room> edit( Room room ) {
        LOG.info( "Room id='{}' has been edited", room.getId() );
        return ResponseEntity.ok( repository.saveAndFlush( room ) );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        repository.delete( id );
        LOG.info( "Room id='{}' has been deleted", id );
        return ResponseEntity.ok().build();
    }

    @Override
    public Page<Room> search( Pageable pageable, String roomType, String bedType, String breakfast ) {
        if ( bedType == null || bedType.equals( "" ) ) bedType = "%";
        else bedType += "%";
        if ( breakfast == null || breakfast.equals( "" ) ) breakfast = "%";
        else breakfast += "%";
        if( roomType == null || roomType.equals( "" ) ) roomType = "%";
        else roomType += "%";

       /* if ( roomType == null || roomType.equals( "" ) ) {
            return repository.findAllByBedTypeAndBreakfast( pageable, bedType, breakfast );
        } else {
            Room.RoomType type = Room.RoomType.valueOf( roomType.toUpperCase() );*/
            return repository.findAllByRoomTypeAndBedTypeAndBreakfast(
                    pageable, roomType, bedType, breakfast
            );

    }

    @Override
    public ResponseEntity<Set<Image>> getAllImages( Long id ) {
        Set<hotels.business.image.domain.Image> images = repository.findOneById( id )
                .map( Room::getImages )
                .orElseGet( null );
        Set<Image> decodedImages = decodeImages( images );

        return ResponseEntity.ok( decodedImages );
    }

    @Override
    public ResponseEntity<Void> addImage( Long id, MultipartFile image ) {
        return repository.findOneById( id )
                .map( r -> {
                    Image img = null;
                    try {
                        img = encodeImage( image );
                        img.setRoom( r );
                    } catch ( IOException e ) {
                        e.printStackTrace();
                    }

                    Set<Image> images = r.getImages();
                    images.add( img );
                    r.setImages( images );
                    repository.saveAndFlush( r );
                    LOG.info( "Image has been added" );
                    return ResponseEntity.ok().build();
                } )
                .orElseGet( () -> new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR ) );
    }

    @Override
    public ResponseEntity<Void> removeImage( Long imageId ) {
        imageRepository.delete( imageId );
        return ResponseEntity.ok().build();
    }

    private Image encodeImage( MultipartFile image ) throws IOException {
        String imgAsString = Base64Utils.encodeToString( image.getBytes() );
        return new Image( imgAsString );
    }

    private Set<Image> decodeImages( Set<Image> images ) {
        Set<Image> decodedImages = new HashSet<>();
        for ( Image image : images ) {
            byte[] decodeFromString = Base64Utils.decodeFromString( image.getImageAsString() );
            Image i = new Image();
            i.setDecodedImage( decodeFromString );
            i.setId( image.getId() );
            decodedImages.add( i );
        }
        return decodedImages;
    }

}
