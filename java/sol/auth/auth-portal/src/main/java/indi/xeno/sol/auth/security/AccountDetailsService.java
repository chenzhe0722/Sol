package indi.xeno.sol.auth.security;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import static indi.xeno.sol.auth.util.SecurityUtils.AVAIL_STATUS;

@Service
class AccountDetailsService implements ReactiveUserDetailsService {

  private final AccountRepo repo;

  AccountDetailsService(@Autowired AccountRepo repo) {
    this.repo = repo;
  }

  @Override
  public Mono<UserDetails> findByUsername(String name) {
    return repo.findFirstByNameAndStatusIn(name, AVAIL_STATUS).flatMap(this::updateLastLogged);
  }

  private Mono<UserDetails> updateLastLogged(Account account) {
    return repo.setLastLoggedAsNowById(account.id()).map(ignore -> new AccountDetails(account));
  }
}
