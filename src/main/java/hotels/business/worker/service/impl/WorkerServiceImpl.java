package hotels.business.worker.service.impl;

import hotels.business.worker.domain.Worker;
import hotels.business.worker.repository.WorkerRepository;
import hotels.business.worker.service.WorkerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Created by kutsaniuk on 11.03.16.
 */
@Component( "workerService" )
public class WorkerServiceImpl implements WorkerService {

    private static final Logger LOG = LoggerFactory.getLogger( WorkerServiceImpl.class );

    @Autowired
    WorkerRepository repository;

    @Override
    public ResponseEntity<Worker> add( Worker worker ) {
        repository.saveAndFlush( worker );
        LOG.info( "Worker '{}' has been added", worker.getFullWorkerName() );
        return ResponseEntity.ok( worker );
    }

    @Override
    public ResponseEntity<Worker> edit( Worker worker ) {
        repository.saveAndFlush( worker );
        LOG.info( "Worker '{}' has been edited", worker.getFullWorkerName() );
        return ResponseEntity.ok( worker );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        repository.delete( id );
        LOG.info( "Worker id='{}' has been deleted", id );
        return ResponseEntity.ok().build();
    }

}
