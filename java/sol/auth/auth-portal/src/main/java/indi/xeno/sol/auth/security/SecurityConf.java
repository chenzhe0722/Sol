package indi.xeno.sol.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.logout.HttpStatusReturningServerLogoutSuccessHandler;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static org.springframework.security.config.web.server.SecurityWebFiltersOrder.AUTHENTICATION;
import static org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository.withHttpOnlyFalse;

@EnableWebFluxSecurity
public class SecurityConf {

  private final AuthenticationWebFilter authFilter;

  public SecurityConf(@Autowired AuthFilter authFilter) {
    this.authFilter = authFilter;
  }

  @Bean
  public SecurityWebFilterChain webFilterChain(ServerHttpSecurity http) {
    return http.authorizeExchange()
        .pathMatchers("/login", "/session/**", "/sign-up/**")
        .permitAll()
        .pathMatchers("/account/**", "/logout")
        .authenticated()
        .pathMatchers("/status/**")
        .hasRole(ADMIN.name())
        .anyExchange()
        .denyAll()
        .and()
        .logout()
        .logoutSuccessHandler(new HttpStatusReturningServerLogoutSuccessHandler())
        .and()
        .csrf()
        .csrfTokenRepository(withHttpOnlyFalse())
        .and()
        .addFilterAt(authFilter, AUTHENTICATION)
        .build();
  }
}
