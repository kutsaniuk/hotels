package hotels.business.image.repository;

import hotels.business.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by NicholasG on 25.04.2016.
 */
public interface ImageRepository extends JpaRepository<Image, Long> {
}
