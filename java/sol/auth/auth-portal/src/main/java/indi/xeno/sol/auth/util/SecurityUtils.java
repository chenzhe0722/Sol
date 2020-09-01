package indi.xeno.sol.auth.util;

import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.security.crypto.factory.PasswordEncoderFactories.createDelegatingPasswordEncoder;

public abstract class SecurityUtils {

  private SecurityUtils() {}

  public static final PasswordEncoder passwordEncoder = createDelegatingPasswordEncoder();
}
