package indi.xeno.sol.common.util;

import indi.xeno.sol.common.domain.WithIndex;
import indi.xeno.sol.common.exception.SwitchException;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.unmodifiableList;

public abstract class EnumUtilities {

  private EnumUtilities() {}

  public static <E extends Enum<E> & WithIndex> E findFirstEnum(Class<E> cl, Integer idx) {
    for (E each : cl.getEnumConstants()) {
      if (each.getIndex().equals(idx)) {
        return each;
      }
    }
    throw new SwitchException(
        "Enumeration index " + idx + " does not exist for enum class " + cl.getName());
  }

  public static <E extends Enum<E> & WithIndex> E findFirstEnumOrElse(
      Class<E> cl, Integer idx, E e) {
    for (E each : cl.getEnumConstants()) {
      if (each.getIndex().equals(idx)) {
        return each;
      }
    }
    return e;
  }

  public static <E extends Enum<E> & WithIndex> List<E> findEnums(Class<E> cl, Integer idx) {
    List<E> enums = new ArrayList<>();
    for (E each : cl.getEnumConstants()) {
      if (each.getIndex().equals(idx)) {
        enums.add(each);
      }
    }
    return unmodifiableList(enums);
  }
}
