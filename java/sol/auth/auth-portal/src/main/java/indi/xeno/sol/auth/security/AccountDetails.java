package indi.xeno.sol.auth.security;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.common.security.BaseUserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serial;
import java.math.BigInteger;
import java.util.List;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;

class AccountDetails extends BaseUserDetails {

  @Serial private static final long serialVersionUID = 1L;

  private static final List<GrantedAuthority> ADMIN_AUTH =
      singletonList(new SimpleGrantedAuthority(ADMIN.name()));

  private static List<GrantedAuthority> auth(Status status) {
    if (ADMIN.equals(status)) {
      return ADMIN_AUTH;
    } else {
      return emptyList();
    }
  }

  private final BigInteger id;

  private final BigInteger version;

  AccountDetails(Account account) {
    super(account.name(), account.password(), auth(account.status()));
    id = account.id();
    version = account.version();
  }

  public BigInteger getId() {
    return id;
  }

  public BigInteger getVersion() {
    return version;
  }
}
