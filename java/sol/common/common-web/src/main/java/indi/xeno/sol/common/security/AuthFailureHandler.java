package indi.xeno.sol.common.security;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationFailureHandler;
import reactor.core.publisher.Mono;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static reactor.core.publisher.Flux.just;

class AuthFailureHandler implements ServerAuthenticationFailureHandler {

  @Override
  public Mono<Void> onAuthenticationFailure(
      WebFilterExchange webFilterExchange, AuthenticationException exception) {
    ServerHttpResponse response = webFilterExchange.getExchange().getResponse();
    DataBuffer buffer =
        response.bufferFactory().wrap(UNAUTHORIZED.getReasonPhrase().getBytes(UTF_8));
    response.setStatusCode(UNAUTHORIZED);
    return response.writeWith(just(buffer));
  }
}
