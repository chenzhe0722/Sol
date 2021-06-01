package indi.xeno.sol.common.security;

import static org.springframework.http.HttpStatus.OK;

import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import reactor.core.publisher.Mono;

class AuthSuccessHandler implements ServerAuthenticationSuccessHandler {

  @Override
  public Mono<Void> onAuthenticationSuccess(
      WebFilterExchange webFilterExchange, Authentication authentication) {
    ServerHttpResponse response = webFilterExchange.getExchange().getResponse();
    response.setStatusCode(OK);
    return response.setComplete();
  }
}
