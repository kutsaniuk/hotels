package hotels.business.worker.repository;

import hotels.business.worker.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface WorkerRepository extends JpaRepository<Worker, Long> {
}
