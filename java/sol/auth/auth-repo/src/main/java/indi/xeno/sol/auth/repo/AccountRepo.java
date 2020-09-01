package indi.xeno.sol.auth.repo;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.projection.Alias;
import indi.xeno.sol.common.repo.NameActiveRepo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
public interface AccountRepo extends NameActiveRepo<Account> {

  Optional<Alias> findAliasById(BigInteger id);

  boolean existsByAdminTrueAndActiveTrue();

  @Modifying
  @Query("UPDATE Account e SET e.admin = :admin WHERE e.id = :id")
  int setAdminById(@Param("id") BigInteger id, @Param("admin") Boolean admin);

  @Modifying
  @Query("UPDATE Account e SET e.lastLoggedOut = :lastLoggedOut WHERE e.id = :id")
  int setLastLoggedOutById(
      @Param("id") BigInteger id, @Param("lastLoggedOut") OffsetDateTime lastLoggedOut);

  @Modifying
  @Query(
      "UPDATE Account e SET e.active = :active WHERE e.lastLoggedOut < :lastLoggedOut AND e.active <> :active")
  int setActiveByLastLoggedOutLessThan(
      @Param("lastLoggedOut") OffsetDateTime lastLoggedOut, @Param("active") Boolean active);

  int removeByLastLoggedOutLessThan(OffsetDateTime lastLoggedOut);
}