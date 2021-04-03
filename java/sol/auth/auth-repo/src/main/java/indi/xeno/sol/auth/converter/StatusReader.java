package indi.xeno.sol.auth.converter;

import indi.xeno.sol.auth.domain.Status;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import static indi.xeno.sol.auth.domain.Status.DELETED;
import static indi.xeno.sol.common.util.EnumUtils.findEnum;

@ReadingConverter
public class StatusReader implements Converter<Short, Status> {

  @Override
  public Status convert(Short index) {
    return findEnum(Status.class, index.intValue()).orElse(DELETED);
  }
}
