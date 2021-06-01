package indi.xeno.sol.auth.security;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static org.springframework.security.config.web.server.SecurityWebFiltersOrder.AUTHENTICATION;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.logout.HttpStatusReturningServerLogoutSuccessHandler;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;

@Configuration
@EnableWebFluxSecurity
public class SecurityConf {

  private final AuthenticationWebFilter authFilter;

  public SecurityConf(@Autowired AuthFilter authFilter) {
    this.authFilter = authFilter;
  }

  @Bean
  public SecurityWebFilterChain webHttpSecurity(ServerHttpSecurity http) {
    return http.authorizeExchange(
            (exchange) ->
                exchange
                    .pathMatchers("/login", "/session/**", "/sign-up/**")
                    .permitAll()
                    .pathMatchers("/account/**", "/logout")
                    .authenticated()
                    .pathMatchers("/status/**")
                    .hasRole(ADMIN.name())
                    .anyExchange()
                    .denyAll())
        .logout(
            (logout) ->
                logout.logoutSuccessHandler(new HttpStatusReturningServerLogoutSuccessHandler()))
        .csrf((csrf) -> csrf.csrfTokenRepository(new CookieServerCsrfTokenRepository()))
        .addFilterAt(authFilter, AUTHENTICATION)
        .build();
  }
}
