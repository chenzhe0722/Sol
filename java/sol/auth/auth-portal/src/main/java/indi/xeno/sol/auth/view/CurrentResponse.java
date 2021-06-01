package indi.xeno.sol.auth.view;

import static indi.xeno.sol.common.util.EntityUtils.NAME;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CurrentResponse (
    @JsonProperty(NAME) String name,
    @JsonProperty(ADMIN) Boolean admin
) {
  private static final String ADMIN = "admin";
}
