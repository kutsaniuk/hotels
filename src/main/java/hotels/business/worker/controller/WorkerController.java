package hotels.business.worker.controller;

import hotels.business.worker.domain.Worker;
import hotels.business.worker.repository.WorkerRepository;
import hotels.business.worker.service.WorkerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<Worker>> search( Pageable pageable,
                                                String fullName,
                                                String post,
                                                String date ) {
        LOG.info( "Getting all worker" );
        Page<Worker> page = workerService.search( pageable, fullName, post, date );
        return ResponseEntity.ok( page );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Worker> addWorker( @RequestBody Worker worker ) {
        LOG.info( "Adding a new worker" );
        return workerService.add( worker );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
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

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Worker> getOne( @PathVariable Long id ) {
        return ResponseEntity.ok( workerRepository.findOne( id ) );
    }

}
