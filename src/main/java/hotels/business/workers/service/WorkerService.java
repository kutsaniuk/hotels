package hotels.business.workers.service;

import hotels.business.workers.domain.Worker;
import org.springframework.http.ResponseEntity;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface WorkerService {

    ResponseEntity<Worker> add( Worker worker );

    ResponseEntity<Worker> edit( Worker worker );

    ResponseEntity<Void> delete( Long id );

}
