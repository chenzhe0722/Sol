package indi.xeno.sol.auth;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import static org.springframework.boot.SpringApplication.run;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class App {

  public static void main(String[] args) {
    run(App.class, args);
  }
}
