package hotels.business.workers.controller;

import hotels.business.workers.domain.Worker;
import hotels.business.workers.repository.WorkerRepository;
import hotels.business.workers.service.WorkerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by NicholasG on 08.04.2016.
 */
@RestController
@RequestMapping( "/worker" )
public class WorkerController {

    private static final Logger LOG = LoggerFactory.getLogger( WorkerController.class );

    @Autowired
    @Qualifier( "workerService" )
    private WorkerService workerService;

    @Autowired
    private WorkerRepository workerRepository;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<Worker>> getAll() {
        LOG.info( "Getting all workers" );
        return ResponseEntity.ok( workerRepository.findAll() );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Worker> addWorker( @RequestBody Worker worker ) {
        LOG.info( "Adding a new worker" );
        return workerService.add( worker );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Worker> editWorker( @RequestBody Worker worker ) {
        LOG.info( "Editing a worker id='{}'", worker.getId() );
        return workerService.edit( worker );
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> deleteWorker( @RequestParam( "id" ) Long id ) {
        LOG.info( "Deleting a worker id='{}'", id );
        return workerService.delete( id );
    }

}
