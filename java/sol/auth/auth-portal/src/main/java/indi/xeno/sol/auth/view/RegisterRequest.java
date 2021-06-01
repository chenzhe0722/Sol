package indi.xeno.sol.auth.view;

import static indi.xeno.sol.auth.util.AccountUtils.PASSWORD;
import static indi.xeno.sol.common.util.EntityUtils.NAME;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RegisterRequest (
    @JsonProperty(NAME) String name,
    @JsonProperty(PASSWORD) String password
) {}
