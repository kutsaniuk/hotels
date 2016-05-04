package hotels.business.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by Iwan on 04.05.2016.
 */
@Profile("prod")
@Configuration
@EnableTransactionManagement
@PropertySource("classpath:/prod.properties")
public class MySqlConfiguration {
}
