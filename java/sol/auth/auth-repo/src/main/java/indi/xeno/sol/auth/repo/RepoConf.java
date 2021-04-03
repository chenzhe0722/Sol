package indi.xeno.sol.auth.repo;

import indi.xeno.sol.auth.converter.StatusReader;
import indi.xeno.sol.auth.converter.StatusWriter;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;

import java.util.List;

import static java.util.Arrays.asList;

@Configuration
public class RepoConf extends AbstractR2dbcConfiguration {

  private final ConnectionFactory connectionFactory;

  public RepoConf(@Autowired ConnectionFactory connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  @Override
  public ConnectionFactory connectionFactory() {
    return connectionFactory;
  }

  @Override
  protected List<Object> getCustomConverters() {
    return asList(new StatusReader(), new StatusWriter());
  }
}
