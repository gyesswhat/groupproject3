package com.example.delivery.repository;

import com.example.delivery.entity.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long> {
    @Query("SELECT p " +
            "FROM Participant p " +
            "WHERE p.user = :userId AND p.post = :postId")
    Participant findByPostIdAndUserId(Long postId, Long userId);

    @Query("SELECT p " +
            "FROM Participant p " +
            "WHERE p.post = :postId")
    List<Participant> findByPostId(Long postId);
}
