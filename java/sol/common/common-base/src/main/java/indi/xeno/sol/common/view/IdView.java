package indi.xeno.sol.common.view;

import com.fasterxml.jackson.annotation.JsonProperty;

import static indi.xeno.sol.common.util.EntityUtils.ID;

public record IdView<T> (@JsonProperty(ID) T id) {}
