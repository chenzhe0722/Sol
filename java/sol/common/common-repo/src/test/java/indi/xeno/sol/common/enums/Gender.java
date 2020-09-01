package indi.xeno.sol.common.enums;

import indi.xeno.sol.common.domain.WithIndex;

public enum Gender implements WithIndex {
  MALE(0),
  FEMALE(1);

  Gender(Integer index) {
    this.index = index;
  }

  private final Integer index;

  @Override
  public Integer getIndex() {
    return index;
  }
}
