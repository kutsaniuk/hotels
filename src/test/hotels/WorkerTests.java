package hotels;

import hotels.business.Application;
import hotels.business.hotel.domain.Hotel;
import hotels.business.worker.domain.Worker;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;
import org.testng.annotations.Test;

import java.sql.Date;

/**
 * Created by NicholasG on 27.04.2016.
 */
@SpringApplicationConfiguration( classes = Application.class )
@WebAppConfiguration
public class WorkerTests {

    @Test
    public void postWorker() {
        String url = "http://localhost:8080/worker";
        Hotel hotel = new Hotel(
                "Hotel name",
                "City test",
                "Address test",
                "Chief test",
                "mail@test.com",
                "0665329987",
                "0970707090"
        );
        hotel.setId( 100500L );
        Worker worker = new Worker(
                "Full name",
                "Current post",
                Date.valueOf( "1975-01-01" ),
                "MALE",
                8,
                "Prev post",
                Date.valueOf( "2014-01-01" )
        );
        worker.setHotel( hotel );

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType( MediaType.APPLICATION_JSON );
        HttpEntity<Worker> requestEntity = new HttpEntity<>( worker, requestHeaders );
        ResponseEntity<Worker> responseEntity = new RestTemplate().exchange( url, HttpMethod.POST, requestEntity, Worker.class );

        assert requestEntity.getBody() != null;
    }

}
