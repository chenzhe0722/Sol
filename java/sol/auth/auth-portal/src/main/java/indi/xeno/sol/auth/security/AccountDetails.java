package indi.xeno.sol.auth.security;

import indi.xeno.sol.auth.entity.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.math.BigInteger;
import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;

public class AccountDetails implements UserDetails {

  @Serial
  private static final long serialVersionUID = 1L;

  static final String ADMIN = "ADMIN";

  private static final List<GrantedAuthority> ADMIN_AUTH =
      singletonList(new SimpleGrantedAuthority(ADMIN));

  private final BigInteger id;

  private final String username;

  private final String password;

  private final boolean enabled;

  private final List<GrantedAuthority> authorities;

  AccountDetails(Account account) {
    id = account.getId();
    username = account.getName();
    password = account.getPassword();
    enabled = account.getActive();
    authorities = account.getAdmin() ? ADMIN_AUTH : emptyList();
  }

  @Override
  public List<GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public BigInteger getId() {
    return id;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }
}
