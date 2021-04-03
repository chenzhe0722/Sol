package indi.xeno.sol.auth.handler;

import indi.xeno.sol.auth.view.CurrentResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.security.Principal;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static indi.xeno.sol.common.util.ServerUtils.ok;
import static indi.xeno.sol.common.util.StrUtils.EMPTY;
import static java.util.Objects.nonNull;
import static reactor.core.publisher.Mono.defer;

public abstract class SessionHandler {

  private SessionHandler() {}

  public static Mono<ServerResponse> current(ServerRequest request) {
    Mono<CsrfToken> token = request.exchange().getAttribute(CsrfToken.class.getName());
    if (nonNull(token)) {
      return token.flatMap(tk -> current(request.principal()));
    }
    return current(request.principal());
  }

  private static Mono<ServerResponse> current(Mono<? extends Principal> principal) {
    return principal.flatMap(SessionHandler::current).switchIfEmpty(defer(SessionHandler::empty));
  }

  private static Mono<ServerResponse> current(Principal principal) {
    if (principal instanceof Authentication auth) {
      Object authPrincipal = auth.getPrincipal();
      if (authPrincipal instanceof UserDetails details) {
        return ok(wrap(details));
      }
    }
    return empty();
  }

  private static CurrentResponse wrap(UserDetails details) {
    return new CurrentResponse(
        details.getUsername(),
        details.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch(ADMIN.name()::equals));
  }

  private static Mono<ServerResponse> empty() {
    return ok(new CurrentResponse(EMPTY, false));
  }
}
