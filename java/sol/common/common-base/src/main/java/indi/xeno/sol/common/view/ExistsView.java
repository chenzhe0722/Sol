package indi.xeno.sol.common.view;

import com.fasterxml.jackson.annotation.JsonProperty;

import static indi.xeno.sol.common.util.EntityUtils.EXISTS;

public record ExistsView (@JsonProperty(EXISTS) Boolean exists) {}
