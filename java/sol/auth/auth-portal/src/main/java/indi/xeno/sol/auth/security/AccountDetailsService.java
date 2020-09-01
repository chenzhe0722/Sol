package indi.xeno.sol.auth.security;

import indi.xeno.sol.auth.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService implements UserDetailsService {

  private final AccountRepo accountRepo;

  public AccountDetailsService(@Autowired AccountRepo accountRepo) {
    this.accountRepo = accountRepo;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return new AccountDetails(
        accountRepo
            .findOneByName(username)
            .orElseThrow(
                () -> new UsernameNotFoundException("Account name: " + username + " not found!")));
  }
}
