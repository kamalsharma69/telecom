package com.telecom.sim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SimServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SimServiceApplication.class, args);
    }
}
