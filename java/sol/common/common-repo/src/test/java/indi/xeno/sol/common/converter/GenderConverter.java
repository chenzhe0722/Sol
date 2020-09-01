package indi.xeno.sol.common.converter;

import indi.xeno.sol.common.enums.Gender;

import static indi.xeno.sol.common.util.EnumUtilities.findFirstEnum;

public class GenderConverter extends EnumConverter<Gender> {

  public GenderConverter() {
    super(i -> findFirstEnum(Gender.class, i));
  }
}
