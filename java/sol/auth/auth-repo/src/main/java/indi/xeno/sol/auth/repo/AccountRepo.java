package indi.xeno.sol.auth.repo;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.projection.Alias;
import indi.xeno.sol.common.repo.NameActiveRepo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface AccountRepo extends NameActiveRepo<Account> {

  Optional<Alias> findAliasById(BigInteger id);

  boolean existsByAdminTrueAndActiveTrue();

  @Modifying
  @Query("UPDATE Account e SET e.admin = :admin WHERE e.id = :id")
  int setAdminById(@Param("id") BigInteger id, @Param("admin") Boolean admin);

  @Modifying
  @Query("UPDATE Account e SET e.lastLogged = CURRENT_TIMESTAMP WHERE e.id = :id")
  int setLastLoggedAsNowById(@Param("id") BigInteger id);
}
