package hotels.business.workers.repository;

import hotels.business.workers.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by kutsaniuk on 11.03.16.
 */
public interface WorkerRepository extends JpaRepository<Worker, Long> {
}
