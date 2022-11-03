package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableAutoConfiguration
@EntityScan
@ComponentScan(
        basePackages = "app")
@Slf4j
public class Application {

    private static final String MODULE_TAG = "App";

    public static void main(String[] args) {

        SpringApplication application = new SpringApplication(Application.class);
        application.run();

        log.info("-- The '{}' server is running --", MODULE_TAG);
    }
}
