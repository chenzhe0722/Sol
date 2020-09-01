package indi.xeno.sol.auth.service;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import static org.slf4j.LoggerFactory.getLogger;

@Service
public class ScheduleService {

  private static final Logger logger = getLogger(ScheduleService.class);

  private final AccountService accountService;

  public ScheduleService(@Autowired AccountService accountService) {
    this.accountService = accountService;
  }

  @Scheduled(cron = "0 0 12 * * ?")
  @Async
  void deactivate() {
    int num = accountService.deactivate();
    if (num > 0) {
      logger.info("Number of account deactivated: {}", num);
    }
  }

  @Scheduled(cron = "0 0 0 * * ?")
  @Async
  void expire() {
    int num = accountService.expire();
    if (num > 0) {
      logger.info("Number of account expired: {}", num);
    }
  }
}
