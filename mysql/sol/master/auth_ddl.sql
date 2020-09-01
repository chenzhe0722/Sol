DROP DATABASE IF EXISTS auth;
CREATE DATABASE auth DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE auth;

CREATE TABLE account (
  PRIMARY KEY (id),
  id              SERIAL,
  name            VARCHAR(255) NOT NULL,
  password        VARCHAR(255) NOT NULL,
  alias           VARCHAR(255) NOT NULL,
  admin           BOOL         NOT NULL DEFAULT FALSE,
  active          BOOL         NOT NULL DEFAULT TRUE,
  last_logged_out DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (name)
) ENGINE = InnoDB;
