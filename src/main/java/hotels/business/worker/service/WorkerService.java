package hotels.business.worker.service;

import hotels.business.worker.domain.Worker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface WorkerService {

    ResponseEntity<Worker> add( final Worker worker );

    ResponseEntity<Worker> edit( Worker worker );

    ResponseEntity<Void> delete( Long id );

    Page<Worker> search( Pageable pageable, String fullName, String post, String date );

    ResponseEntity<Void> updateLogo( Long id, MultipartFile logo );

    ResponseEntity<String> getLogo( Long id );

}
