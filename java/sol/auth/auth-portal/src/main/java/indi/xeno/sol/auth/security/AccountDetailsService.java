package indi.xeno.sol.auth.security;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.repo.AccountRepo;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.slf4j.LoggerFactory.getLogger;

@Service
public class AccountDetailsService implements UserDetailsService {

  private final AccountRepo accountRepo;

  private static final Logger logger = getLogger(AccountDetailsService.class);

  public AccountDetailsService(@Autowired AccountRepo accountRepo) {
    this.accountRepo = accountRepo;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return accountRepo
        .findOneByName(username)
        .map(this::updateLastLogged)
        .orElseThrow(
            () -> new UsernameNotFoundException("Account name: " + username + " not found!"));
  }

  private UserDetails updateLastLogged(Account account) {
    if (accountRepo.setLastLoggedAsNowById(account.getId()) == 0) {
      logger.warn("Account id: {} update last logged time failed!", account.getId());
    }
    return new AccountDetails(account);
  }
}
