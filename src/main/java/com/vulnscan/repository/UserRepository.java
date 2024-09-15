package com.vulnscan.repository;

import com.vulnscan.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByPhone(String phone);

}
