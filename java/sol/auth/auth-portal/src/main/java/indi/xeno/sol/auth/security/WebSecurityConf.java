package indi.xeno.sol.auth.security;

import indi.xeno.sol.common.filter.CachingFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import static indi.xeno.sol.auth.security.AccountDetails.ADMIN;
import static indi.xeno.sol.auth.util.SecurityUtils.passwordEncoder;
import static org.springframework.security.web.csrf.CookieCsrfTokenRepository.withHttpOnlyFalse;

@EnableWebSecurity
public class WebSecurityConf extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;

  public WebSecurityConf(@Autowired AccountDetailsService accountDetailsService) {
    super();
    userDetailsService = accountDetailsService;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
        .mvcMatchers("/login", "/sign-up/**")
        .permitAll()
        .mvcMatchers("/admin/**")
        .hasRole(ADMIN)
        .mvcMatchers("/logout", "/account/**")
        .authenticated()
        .anyRequest()
        .denyAll()
        .and()
        .logout()
        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
        .and()
        .csrf()
        .csrfTokenRepository(withHttpOnlyFalse())
        .and()
        .addFilterAt(cachingFilter(), ChannelProcessingFilter.class)
        .addFilterAt(authFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
  }

  @Bean
  CachingFilter cachingFilter() {
    return new CachingFilter();
  }

  @Bean
  AuthFilter authFilter() throws Exception {
    return new AuthFilter(authenticationManager());
  }
}
