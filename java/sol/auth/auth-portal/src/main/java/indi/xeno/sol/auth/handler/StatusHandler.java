package indi.xeno.sol.auth.handler;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static indi.xeno.sol.auth.domain.Status.ARCHIVED;
import static indi.xeno.sol.auth.domain.Status.DELETED;
import static indi.xeno.sol.auth.domain.Status.USER;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.auth.repo.AccountRepo;
import indi.xeno.sol.common.util.ServerUtils;
import indi.xeno.sol.common.view.IdView;
import java.math.BigInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class StatusHandler {

  private static final ParameterizedTypeReference<IdView<BigInteger>> ID_REQUEST_TYPE =
      new ParameterizedTypeReference<>() {};

  private final AccountRepo repo;

  public StatusHandler(@Autowired AccountRepo repo) {
    this.repo = repo;
  }

  public Mono<ServerResponse> admin(ServerRequest request) {
    return status(request, ADMIN);
  }

  public Mono<ServerResponse> user(ServerRequest request) {
    return status(request, USER);
  }

  public Mono<ServerResponse> archived(ServerRequest request) {
    return status(request, ARCHIVED);
  }

  public Mono<ServerResponse> deleted(ServerRequest request) {
    return status(request, DELETED);
  }

  private Mono<ServerResponse> status(ServerRequest request, Status status) {
    return request
        .bodyToMono(ID_REQUEST_TYPE)
        .flatMap(v -> repo.setStatusByIdAndStatusNotDeleted(v.id(), status))
        .flatMap(ServerUtils::ignore);
  }
}
