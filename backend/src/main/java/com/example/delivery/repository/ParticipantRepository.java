package com.example.delivery.repository;

import com.example.delivery.entity.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long> {
    @Query(value = "SELECT *" +
            "FROM participant" +
            "WHERE postId = :postId" +
            "AND userId = :userId", nativeQuery = true)
    Participant findByPostIdAndUserId(Long postId, Long userId);

    @Query(value = "SELECT *" +
            "FROM participant" +
            "WHERE postId = :postId", nativeQuery = true)
    List<Participant> findByPostId(Long postId);

    @Query(name="Participant.getPartNum", nativeQuery = true)
    Integer getPartNum(@Param("postId") Long postId);

    @Query(name="Participant.getDepositCheckedNum", nativeQuery = true)
    Integer getDepositCheckedNum(@Param("postId") Long postId);
}
