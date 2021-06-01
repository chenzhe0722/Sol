package indi.xeno.sol.auth.entity;

import indi.xeno.sol.auth.domain.Status;
import indi.xeno.sol.common.entity.IdEntity;
import indi.xeno.sol.common.entity.NameEntity;
import java.math.BigInteger;
import java.time.OffsetDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table
public record Account(
    @Id BigInteger id,
    String name,
    String password,
    Status status,
    OffsetDateTime lastLogged,
    BigInteger version
) implements IdEntity<BigInteger>, NameEntity, StatusEntity {}
