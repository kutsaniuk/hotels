package hotels.business.image.service;

import hotels.business.image.domain.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

/**
 * Created by NicholasG on 28.04.2016.
 */
public interface ImageService {

    Image encodeImage( MultipartFile image );

    Set<Image> decodeImages( Set<Image> images );

}
