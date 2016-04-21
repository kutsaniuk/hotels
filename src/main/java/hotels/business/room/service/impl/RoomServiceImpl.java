package hotels.business.room.service.impl;

import hotels.business.room.domain.Room;
import hotels.business.room.repository.RoomRepository;
import hotels.business.room.service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Created by kutsaniuk on 11.03.16.
 */
@Component( "roomService" )
public class RoomServiceImpl implements RoomService {

    private static final Logger LOG = LoggerFactory.getLogger( RoomServiceImpl.class );

    @Autowired
    private RoomRepository repository;

    @Override
    public ResponseEntity<Room> add( Room room ) {
        LOG.info( "Room id='{}' has been added", room.getId() );
        return ResponseEntity.ok( repository.saveAndFlush( room ) );
    }

    @Override
    public ResponseEntity<Room> edit( Room room ) {
        LOG.info( "Room id='{}' has been edited", room.getId() );
        return ResponseEntity.ok( repository.saveAndFlush( room ) );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        repository.delete( id );
        LOG.info( "Room id='{}' has been deleted", id );
        return ResponseEntity.ok().build();
    }

    @Override
    public Page<Room> search( Pageable pageable, String roomType, String bedType, String breakfast ) {
        return null;
    }

}
