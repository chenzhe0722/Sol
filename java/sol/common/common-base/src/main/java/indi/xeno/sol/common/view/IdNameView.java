package indi.xeno.sol.common.view;

import com.fasterxml.jackson.annotation.JsonProperty;

import static indi.xeno.sol.common.util.EntityUtils.ID;
import static indi.xeno.sol.common.util.EntityUtils.NAME;

public record IdNameView<T> (@JsonProperty(ID) T id, @JsonProperty(NAME) String name) {}
