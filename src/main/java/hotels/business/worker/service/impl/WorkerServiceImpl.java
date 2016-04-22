package hotels.business.worker.service.impl;

import hotels.business.worker.domain.Worker;
import hotels.business.worker.repository.WorkerRepository;
import hotels.business.worker.service.WorkerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.sql.Date;

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
        LOG.info( "Worker '{}' has been added", worker.getFullName() );
        return ResponseEntity.ok( worker );
    }

    @Override
    public ResponseEntity<Worker> edit( Worker worker ) {
        repository.saveAndFlush( worker );
        LOG.info( "Worker '{}' has been edited", worker.getFullName() );
        return ResponseEntity.ok( worker );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        repository.delete( id );
        LOG.info( "Worker id='{}' has been deleted", id );
        return ResponseEntity.ok().build();
    }

    @Override
    public Page<Worker> search( Pageable pageable, String fullName, String post, String date ) {
        if ( fullName == null || fullName.equals( "" ) ) fullName = "%";
        else fullName += "%";
        if ( post == null || post.equals( "" ) ) post = "%";
        else post += "%";

        try {
            Date d = Date.valueOf( date );
            return repository.findAllByFullNameAndPostAndDateOfEmployment( pageable, fullName, post, d );
        } catch ( IllegalArgumentException e ) {
            return repository.findAllByFullNameAndPost( pageable, fullName, post );
        }
    }

}
