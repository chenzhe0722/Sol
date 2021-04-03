package indi.xeno.sol.auth.entity;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.common.entity.IdEntity;
import indi.xeno.sol.common.entity.NameEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Table
public record Account (
    @Id BigInteger id,
    String name,
    String password,
    Status status,
    LocalDateTime lastLogged,
    BigInteger version
) implements IdEntity<BigInteger>, NameEntity, StatusEntity {}
