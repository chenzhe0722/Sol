package indi.xeno.sol.auth.security;

import static indi.xeno.sol.auth.util.AccountUtils.PASSWORD;
import static indi.xeno.sol.common.util.EntityUtils.NAME;
import static indi.xeno.sol.common.util.JsonUtils.readJson;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers.pathMatchers;

import com.fasterxml.jackson.databind.JsonNode;
import indi.xeno.sol.common.security.BaseAuthFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.SequenceInputStream;
import java.io.UncheckedIOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
class AuthFilter extends BaseAuthFilter {

  AuthFilter(@Autowired AccountDetailsService accountDetailsService) {
    super(new UserDetailsRepositoryReactiveAuthenticationManager(accountDetailsService));
    setRequiresAuthenticationMatcher(pathMatchers(POST, "/login"));
    setServerAuthenticationConverter(AuthFilter::convert);
  }

  private static Mono<Authentication> convert(ServerWebExchange exchange) {
    return exchange
        .getRequest()
        .getBody()
        .map(buf -> buf.asInputStream(true))
        .reduce(SequenceInputStream::new)
        .map(AuthFilter::convert);
  }

  private static Authentication convert(InputStream is) {
    try {
      JsonNode root = readJson(is);
      String username = root.get(NAME).asText();
      String password = root.get(PASSWORD).asText();
      return new UsernamePasswordAuthenticationToken(username, password);
    } catch (IOException ex) {
      throw new UncheckedIOException(ex);
    }
  }
}
