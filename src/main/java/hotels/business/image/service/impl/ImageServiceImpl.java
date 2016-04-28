package hotels.business.image.service.impl;

import hotels.business.image.domain.Image;
import hotels.business.image.service.ImageService;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by NicholasG on 28.04.2016.
 */
@Component( "imageService" )
public class ImageServiceImpl implements ImageService {

    @Override
    public Image encodeImage( MultipartFile image ) {
        String imgAsString = null;
        try {
            imgAsString = Base64Utils.encodeToString( image.getBytes() );
        } catch ( IOException e ) {
            e.printStackTrace();
        }
        return new Image( imgAsString );
    }

    @Override
    public Set<Image> decodeImages( Set<Image> images ) {
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
