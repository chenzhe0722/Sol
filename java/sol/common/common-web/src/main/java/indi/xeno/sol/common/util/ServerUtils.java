package indi.xeno.sol.common.util;

import org.reactivestreams.Publisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.TEXT_PLAIN;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

public abstract class ServerUtils {

  private ServerUtils() {}

  public static final RequestPredicate ACCEPT_JSON = accept(APPLICATION_JSON);

  public static <T, P extends Publisher<T>> Mono<ServerResponse> ok(P body, Class<T> cl) {
    return ServerResponse.ok().contentType(APPLICATION_JSON).body(body, cl);
  }

  public static <T> Mono<ServerResponse> ok(T body) {
    return ServerResponse.ok().contentType(APPLICATION_JSON).bodyValue(body);
  }

  public static <T> Mono<ServerResponse> ignore(T obj) {
    return ServerResponse.ok().build();
  }

  public static Mono<ServerResponse> badRequest() {
    return ServerResponse.badRequest().build();
  }

  public static Mono<ServerResponse> badRequest(String msg) {
    return ServerResponse.badRequest().contentType(TEXT_PLAIN).bodyValue(msg);
  }

  public static Mono<ServerResponse> status(HttpStatus status) {
    return ServerResponse.status(status).build();
  }

  public static Mono<ServerResponse> status(HttpStatus status, String msg) {
    return ServerResponse.status(status).contentType(TEXT_PLAIN).bodyValue(msg);
  }
}
