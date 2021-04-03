package indi.xeno.sol.auth.api;

import indi.xeno.sol.auth.handler.SessionHandler;
import indi.xeno.sol.auth.handler.SignUpHandler;
import indi.xeno.sol.auth.handler.StatusHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions.Builder;
import org.springframework.web.reactive.function.server.ServerResponse;

import static indi.xeno.sol.common.util.ServerUtils.ACCEPT_JSON;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
@EnableWebFlux
public class WebConf implements WebFluxConfigurer {

  private final SignUpHandler signUpHandler;

  private final StatusHandler statusHandler;

  public WebConf(@Autowired SignUpHandler signUpHandler, @Autowired StatusHandler statusHandler) {
    this.signUpHandler = signUpHandler;
    this.statusHandler = statusHandler;
  }

  @Bean
  public RouterFunction<ServerResponse> router() {
    return route()
        .path("/session", WebConf::sessionHandler)
        .path("/sign-up", this::signUpRouter)
        .path("/status", this::statusRouter)
        .build();
  }

  private static void sessionHandler(Builder builder) {
    builder.GET("/current", SessionHandler::current);
  }

  private void signUpRouter(Builder builder) {
    builder
        .GET("/check", signUpHandler::check)
        .POST("/register", ACCEPT_JSON, signUpHandler::register);
  }

  private void statusRouter(Builder builder) {
    builder
        .PUT("/admin", ACCEPT_JSON, statusHandler::admin)
        .PUT("/user", ACCEPT_JSON, statusHandler::user)
        .PUT("/archived", ACCEPT_JSON, statusHandler::archived)
        .PUT("/deleted", ACCEPT_JSON, statusHandler::deleted);
  }
}
