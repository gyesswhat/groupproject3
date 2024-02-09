package com.example.delivery.repository;

import com.example.delivery.dto.UserDetailDto;
import com.example.delivery.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    @Query("SELECT new com.example.delivery.dto.UserDetailDto(u.email, u.nickname, u.account, u.bank)" +
            "FROM User u" +
            "WHERE u.userId = :userId")
    UserDetailDto findUserDetail(@Param("userId") Long userId);


}
