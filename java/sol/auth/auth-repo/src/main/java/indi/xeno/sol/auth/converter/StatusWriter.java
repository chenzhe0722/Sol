package indi.xeno.sol.auth.converter;

import indi.xeno.sol.auth.domain.Status;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;

import static java.lang.Integer.valueOf;

@WritingConverter
public class StatusWriter implements Converter<Status, Short> {

  @Override
  public Short convert(Status status) {
    return valueOf(status.ordinal()).shortValue();
  }
}
