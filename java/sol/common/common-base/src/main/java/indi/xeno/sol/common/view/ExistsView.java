package indi.xeno.sol.common.view;

import static indi.xeno.sol.common.util.EntityUtils.EXISTS;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ExistsView(@JsonProperty(EXISTS) Boolean exists) {}
