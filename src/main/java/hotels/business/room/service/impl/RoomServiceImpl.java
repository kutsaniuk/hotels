package hotels.business.room.service.impl;

import hotels.business.image.domain.Image;
import hotels.business.image.repository.ImageRepository;
import hotels.business.image.service.ImageService;
import hotels.business.room.domain.Room;
import hotels.business.room.repository.RoomRepository;
import hotels.business.room.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    @Qualifier( "imageService" )
    private ImageService imageService;

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
        if (roomType == null && bedType == null && breakfast == null) {
            return repository.getAll(pageable);
        }
        if ((roomType == null || roomType.equals("")) && (bedType != null && !bedType.equals("")) && (breakfast != null && !breakfast.equals(""))) {
            Room.BedType bt = Room.BedType.valueOf(bedType.toUpperCase());
            Room.Breakfast br = Room.Breakfast.valueOf(breakfast.toUpperCase());
            return repository.findAllByBedTypeAndBreakfast(pageable, bt, br);
        } else if ((roomType == null || roomType.equals("")) && (bedType == null || bedType.equals("")) && (breakfast != null || !breakfast.equals(""))) {
            Room.Breakfast br = Room.Breakfast.valueOf(breakfast.toUpperCase());
            return repository.findAllByBreakfast(pageable, br);
        } else if ((breakfast == null || breakfast.equals("")) && (bedType == null || bedType.equals("")) && (roomType != null)) {
            Room.RoomType type = Room.RoomType.valueOf(roomType.toUpperCase());
            return repository.findAllByRoomType(pageable, type);
        } else if ((roomType == null || roomType.equals("")) && (breakfast == null || breakfast.equals("")) && (bedType != null && !bedType.equals(""))) {
            Room.BedType bt = Room.BedType.valueOf(bedType.toUpperCase());
            return repository.findAllByBedType(pageable, bt);
        } else if ((breakfast == null || breakfast.equals("")) && (roomType != null) && (bedType != null)) {
            Room.RoomType type = Room.RoomType.valueOf(roomType.toUpperCase());
            Room.BedType bt = Room.BedType.valueOf(bedType.toUpperCase());
            return repository.findAllByRoomTypeAndBedType(pageable, type, bt);
        } else if ((bedType == null || bedType.equals("")) && (roomType != null) && (breakfast != null)) {
            Room.RoomType type = Room.RoomType.valueOf(roomType.toUpperCase());
            Room.Breakfast br = Room.Breakfast.valueOf(breakfast.toUpperCase());
            return repository.findAllByRoomTypeAndBreakfast(pageable, type, br);
        } else if (roomType != null && bedType != null && breakfast != null) {
            Room.RoomType type = Room.RoomType.valueOf(roomType.toUpperCase());
            Room.BedType bt = Room.BedType.valueOf(bedType.toUpperCase());
            Room.Breakfast br = Room.Breakfast.valueOf(breakfast.toUpperCase());
            return repository.findAllByRoomTypeAndBedTypeAndBreakfast(pageable, type, bt, br);
        } else
            return null;
    }

    @Override
    public ResponseEntity<Set<Image>> getAllImages( Long id ) {
        Set<hotels.business.image.domain.Image> images = repository.findOneById( id )
                .map( Room::getImages )
                .orElseGet( null );
        Set<Image> decodedImages = imageService.decodeImages( images );

        return ResponseEntity.ok( decodedImages );
    }

    @Override
    public ResponseEntity<Void> addImage( Long id, MultipartFile image ) {
        return repository.findOneById( id )
                .map( r -> {
                    Image img = null;
                    img = imageService.encodeImage( image );
                    img.setRoom( r );

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

}
