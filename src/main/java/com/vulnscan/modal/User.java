package com.vulnscan.modal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vulnscan.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String lastName;
    private String email;
    private String phone;
    private String title;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

}
