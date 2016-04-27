package hotels;

import hotels.business.Application;
import hotels.business.hotel.domain.Hotel;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;
import org.testng.annotations.Test;

/**
 * Created by NicholasG on 27.04.2016.
 */
@SpringApplicationConfiguration( classes = Application.class )
@WebAppConfiguration
public class HotelTests {

    @Test
    public void postHotel() {
        String url = "http://localhost:8080/hotel";

        Hotel hotel = new Hotel(
                "Hotel name",
                "City test",
                "Address test",
                "Chief test",
                "mail@test.com",
                "0665329987",
                "0970707090"
        );
//        hotel.setId( 100500L );

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType( MediaType.APPLICATION_JSON );
        HttpEntity<Hotel> requestEntity = new HttpEntity<>( hotel, requestHeaders );
        ResponseEntity<Hotel> responseEntity = new RestTemplate().exchange( url, HttpMethod.POST, requestEntity, Hotel.class );

        assert requestEntity.getBody() != null;
    }

}
