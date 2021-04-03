package indi.xeno.sol.common.security;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;

public class BaseAuthFilter extends AuthenticationWebFilter {

  public BaseAuthFilter(ReactiveAuthenticationManager authenticationManager) {
    super(authenticationManager);
    setAuthenticationSuccessHandler(new AuthSuccessHandler());
    setAuthenticationFailureHandler(new AuthFailureHandler());
    setSecurityContextRepository(new WebSessionServerSecurityContextRepository());
  }
}
