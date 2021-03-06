package hotels.business.hotel.service.impl;

import hotels.business.hotel.domain.Hotel;
import hotels.business.hotel.repository.HotelRepository;
import hotels.business.hotel.service.HotelService;
import hotels.business.image.domain.Image;
import hotels.business.image.repository.ImageRepository;
import hotels.business.image.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;

/**
 * Created by kutsaniuk on 11.03.16.
 */
@Component( "hotelService" )
public class HotelServiceImpl implements HotelService {

    private static final Logger LOG = LoggerFactory.getLogger( HotelServiceImpl.class );

    @Autowired
    private HotelRepository repository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    @Qualifier( "imageService" )
    private ImageService imageService;

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

    @Override
    public ResponseEntity<String> getLogo( Long id ) {
        return repository.findOneById( id )
                .map( h -> ResponseEntity.ok( ("{\"logo\": " + '"' + h.getLogo() + '"' + "}") ) )
                .orElseGet( () -> new ResponseEntity<>( HttpStatus.NOT_FOUND ) );
    }

    @Override
    public ResponseEntity<Void> updateLogo( Long id, MultipartFile image ) {
        return repository.findOneById( id )
                .map( h -> {
                    try {
                        h.setLogo( Base64Utils.encodeToString( image.getBytes() ) );
                    } catch ( IOException e ) {
                        LOG.warn( Arrays.toString( e.getStackTrace() ) );
                    }
                    repository.saveAndFlush( h );
                    LOG.info( "Logo has been updated" );
                    return ResponseEntity.ok().build();
                } )
                .orElseGet( () -> new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR ) );
    }

    @Override
    public ResponseEntity<Set<Image>> getAllImages( Long id ) {
        Set<hotels.business.image.domain.Image> images = repository.findOneById( id )
                .map( Hotel::getImages )
                .orElseGet( null );
        Set<Image> decodedImages = imageService.decodeImages( images );

        return ResponseEntity.ok( decodedImages );
    }

    @Override
    public ResponseEntity<Void> addImage( Long id, MultipartFile image ) {
        return repository.findOneById( id )
                .map( h -> {
                    Image img = null;
                    img = imageService.encodeImage( image );
                    img.setHotel( h );

                    Set<Image> images = h.getImages();
                    images.add( img );
                    h.setImages( images );
                    repository.saveAndFlush( h );
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
