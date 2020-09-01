package indi.xeno.sol.auth.service;

import indi.xeno.sol.auth.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.time.OffsetDateTime.now;

@Service
public class AccountService {

  private static final long EXPIRE_DAYS = 360;

  private static final long DEACTIVATE_DAYS = EXPIRE_DAYS / 2;

  private final AccountRepo repo;

  public AccountService(@Autowired AccountRepo repo) {
    this.repo = repo;
  }

  @Transactional
  public int deactivate() {
    return repo.setActiveByLastLoggedOutLessThan(now().minusDays(DEACTIVATE_DAYS), false);
  }

  @Transactional
  public int expire() {
    return repo.removeByLastLoggedOutLessThan(now().minusDays(EXPIRE_DAYS));
  }
}
