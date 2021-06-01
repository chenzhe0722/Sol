package indi.xeno.sol.auth.view;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CsrfResponse(@JsonProperty(TOKEN) String token) {

  private static final String TOKEN = "token";
}
