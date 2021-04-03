package indi.xeno.sol.common.util;

import java.util.Optional;

import static java.util.stream.Stream.of;

public abstract class EnumUtils {

  private EnumUtils() {}

  public static <E extends Enum<E>> Optional<E> findEnum(Class<E> cl, int ord) {
    return of(cl.getEnumConstants()).filter(e -> e.ordinal() == ord).findFirst();
  }
}
