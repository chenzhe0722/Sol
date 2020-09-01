package indi.xeno.sol.common.converter;

import indi.xeno.sol.common.domain.WithIndex;

import javax.persistence.AttributeConverter;
import java.util.function.Function;

import static java.util.Objects.nonNull;

public abstract class EnumConverter<T extends Enum<T> & WithIndex>
    implements AttributeConverter<T, Integer> {

  private final Function<Integer, T> parseFunc;

  protected EnumConverter(Function<Integer, T> parseFunc) {
    this.parseFunc = parseFunc;
  }

  @Override
  public Integer convertToDatabaseColumn(T entity) {
    return nonNull(entity) ? entity.getIndex() : null;
  }

  @Override
  public T convertToEntityAttribute(Integer index) {
    return nonNull(index) ? parseFunc.apply(index) : null;
  }
}
