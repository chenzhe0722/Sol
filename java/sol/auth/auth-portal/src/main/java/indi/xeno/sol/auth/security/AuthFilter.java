package indi.xeno.sol.auth.security;

import indi.xeno.sol.common.auth.AuthFailureHandler;
import indi.xeno.sol.common.auth.AuthSuccessHandler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UncheckedIOException;

import static indi.xeno.sol.common.util.JsonUtilities.read;

class AuthFilter extends UsernamePasswordAuthenticationFilter {

  private static final String USERNAME_PARAM = "name";

  AuthFilter(AuthenticationManager manager) {
    super();
    setAuthenticationManager(manager);
    setAuthenticationSuccessHandler(new AuthSuccessHandler());
    setAuthenticationFailureHandler(new AuthFailureHandler());
    setUsernameParameter(USERNAME_PARAM);
  }

  @Override
  protected String obtainUsername(HttpServletRequest request) {
    try {
      return read(request.getReader()).path(getUsernameParameter()).asText();
    } catch (IOException ex) {
      throw new UncheckedIOException(ex);
    }
  }

  @Override
  protected String obtainPassword(HttpServletRequest request) {
    try {
      return read(request.getReader()).path(getPasswordParameter()).asText();
    } catch (IOException ex) {
      throw new UncheckedIOException(ex);
    }
  }
}
