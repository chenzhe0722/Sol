package indi.xeno.sol.common.view;

import static indi.xeno.sol.common.util.EntityUtils.ID;

import com.fasterxml.jackson.annotation.JsonProperty;

public record IdView<T> (@JsonProperty(ID) T id) {}
