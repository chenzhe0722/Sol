package indi.xeno.sol.auth.repo;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.entity.StatusEntity;
import indi.xeno.sol.common.entity.IdEntity;
import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.math.BigInteger;
import java.util.Collection;

import static indi.xeno.sol.auth.util.AccountUtils.PASSWORD;
import static indi.xeno.sol.auth.util.AccountUtils.STATUS;
import static indi.xeno.sol.common.util.EntityUtils.ID;
import static indi.xeno.sol.common.util.EntityUtils.NAME;

@Repository
public interface AccountRepo extends ReactiveCrudRepository<Account, BigInteger> {

  Mono<Boolean> existsByStatus(Status status);

  Mono<Boolean> existsByNameAndStatusNot(String name, Status status);

  Mono<StatusEntity> findFirstByName(String name);

  Mono<IdEntity<BigInteger>> findFirstByStatus(Status status);

  Mono<Account> findFirstByNameAndStatusIn(String name, Collection<Status> status);

  @Modifying
  @Query("UPDATE account SET status = :status WHERE id = :id AND status <> 0")
  Mono<Boolean> setStatusByIdAndStatusNotDeleted(
      @Param(ID) BigInteger id, @Param(STATUS) Status status);

  @Modifying
  @Query("UPDATE account SET last_logged = NOW() WHERE id = :id")
  Mono<Boolean> setLastLoggedAsNowById(@Param(ID) BigInteger id);

  @Modifying
  @Query("INSERT INTO account (name, password, status) VALUES (:name, :password, :status)")
  Mono<Boolean> create(
      @Param(NAME) String name, @Param(PASSWORD) String password, @Param(STATUS) Status status);

  @Modifying
  @Query(
      "UPDATE account SET name = :name password = :password, status = :status, version = version + 1 WHERE id = :id AND status = 0")
  Mono<Boolean> createById(
      @Param(ID) BigInteger id,
      @Param(NAME) String name,
      @Param(PASSWORD) String password,
      @Param(STATUS) Status status);

  @Modifying
  @Query(
      "UPDATE account SET password = :password, status = :status, version = version + 1 WHERE name = :name AND status = 0")
  Mono<Boolean> createByName(
      @Param(ID) String name, @Param(PASSWORD) String password, @Param(STATUS) Status status);
}
