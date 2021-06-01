package indi.xeno.sol.common.util;

import static java.util.stream.Stream.of;

import java.util.Optional;

public abstract class EnumUtils {

  private EnumUtils() {}

  public static <E extends Enum<E>> Optional<E> findEnum(Class<E> cls, int ord) {
    return of(cls.getEnumConstants()).filter(e -> e.ordinal() == ord).findFirst();
  }
}
