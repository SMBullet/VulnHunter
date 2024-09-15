package com.vulnscan.service;

import com.vulnscan.modal.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
    public User findUserById(Long userId) throws Exception;
}
