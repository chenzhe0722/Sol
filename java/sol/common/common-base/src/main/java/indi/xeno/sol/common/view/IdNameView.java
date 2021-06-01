package indi.xeno.sol.common.view;

import static indi.xeno.sol.common.util.EntityUtils.ID;
import static indi.xeno.sol.common.util.EntityUtils.NAME;

import com.fasterxml.jackson.annotation.JsonProperty;

public record IdNameView<T>(@JsonProperty(ID) T id, @JsonProperty(NAME) String name) {}
