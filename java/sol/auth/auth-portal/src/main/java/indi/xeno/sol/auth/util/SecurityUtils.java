package indi.xeno.sol.auth.util;

import static indi.xeno.sol.auth.domain.Status.ADMIN;
import static indi.xeno.sol.auth.domain.Status.USER;
import static java.util.Arrays.asList;
import static org.springframework.security.crypto.factory.PasswordEncoderFactories.createDelegatingPasswordEncoder;

import indi.xeno.sol.auth.domain.Status;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

public abstract class SecurityUtils {

  private SecurityUtils() {}

  private static final PasswordEncoder PASSWORD_ENCODER = createDelegatingPasswordEncoder();

  public static String encodePassword(CharSequence password) {
    return PASSWORD_ENCODER.encode(password);
  }

  public static final List<Status> AVAIL_STATUS = asList(USER, ADMIN);
}
