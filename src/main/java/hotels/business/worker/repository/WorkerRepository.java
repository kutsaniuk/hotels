package hotels.business.worker.repository;

import hotels.business.worker.domain.Worker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.Optional;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface WorkerRepository extends JpaRepository<Worker, Long> {

    Optional<Worker> findOneById( Long id );

    @Query( "SELECT w FROM Worker w " +
            "WHERE LOWER(w.fullName) LIKE LOWER(:fullName) " +
            "AND LOWER(w.post) LIKE LOWER(:post) " +
            "AND w.dateOfEmployment = :doe" )
    Page<Worker> findAllByFullNameAndPostAndDateOfEmployment( Pageable pageable,
                                                              @Param( "fullName" ) String fullName,
                                                              @Param( "post" ) String post,
                                                              @Param( "doe" ) Date dateOfEmployment );

    @Query( "SELECT w FROM Worker w " +
            "WHERE LOWER(w.fullName) LIKE LOWER(:fullName) " +
            "AND LOWER(w.post) LIKE LOWER(:post)" )
    Page<Worker> findAllByFullNameAndPost( Pageable pageable,
                                           @Param( "fullName" ) String fullName,
                                           @Param( "post" ) String post );

}
