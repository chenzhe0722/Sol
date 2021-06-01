package indi.xeno.sol.auth.handler;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static indi.xeno.sol.auth.domain.Status.DELETED;
import static indi.xeno.sol.auth.domain.Status.USER;
import static indi.xeno.sol.auth.util.SecurityUtils.encodePassword;
import static indi.xeno.sol.common.util.EntityUtils.NAME;
import static indi.xeno.sol.common.util.ServerUtils.ok;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;
import static reactor.core.publisher.Mono.defer;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.auth.repo.AccountRepo;
import indi.xeno.sol.auth.view.RegisterRequest;
import indi.xeno.sol.common.entity.IdEntity;
import indi.xeno.sol.common.util.ServerUtils;
import indi.xeno.sol.common.view.ExistsView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class SignUpHandler {

  private final AccountRepo repo;

  public SignUpHandler(@Autowired AccountRepo repo) {
    this.repo = repo;
  }

  public Mono<ServerResponse> check(ServerRequest request) {
    return request.queryParam(NAME).map(this::check).orElseGet(ServerUtils::badRequest);
  }

  private Mono<ServerResponse> check(String name) {
    return ok(repo.existsByNameAndStatusNot(name, DELETED).map(ExistsView::new), ExistsView.class);
  }

  @Transactional
  public Mono<ServerResponse> register(ServerRequest request) {
    return request.bodyToMono(RegisterRequest.class).flatMap(this::register);
  }

  private Mono<ServerResponse> register(RegisterRequest view) {
    String name = view.name();
    String pwd = view.password();
    return repo.findFirstByName(view.name())
        .flatMap(e -> createByName(e.status(), name, pwd))
        .switchIfEmpty(defer(() -> createByDeleted(name, pwd)))
        .switchIfEmpty(defer(() -> create(name, pwd)));
  }

  private Mono<ServerResponse> createByName(Status current, String name, String pwd) {
    if (DELETED.equals(current)) {
      return repo.existsByStatus(ADMIN)
          .flatMap(exists -> repo.createByName(name, encodePassword(pwd), status(exists)))
          .flatMap(ServerUtils::ignore);
    } else {
      return ServerUtils.status(UNPROCESSABLE_ENTITY);
    }
  }

  private Mono<ServerResponse> createByDeleted(String name, String pwd) {
    return repo.findFirstByStatus(DELETED)
        .map(IdEntity::id)
        .zipWith(
            defer(() -> repo.existsByStatus(ADMIN)),
            (id, exists) -> repo.createById(id, name, encodePassword(pwd), status(exists)))
        .flatMap(ServerUtils::ignore);
  }

  private Mono<ServerResponse> create(String name, String pwd) {
    return repo.existsByStatus(ADMIN)
        .flatMap(exists -> repo.create(name, encodePassword(pwd), status(exists)))
        .flatMap(ServerUtils::ignore);
  }

  private static Status status(Boolean exists) {
    return exists ? USER : ADMIN;
  }
}
