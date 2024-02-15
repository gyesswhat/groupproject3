package com.example.delivery.repository;

import com.example.delivery.entity.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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

    @Query(name="Participant.getPartNum", nativeQuery = true)
    Integer getPartNum(@Param("postId") Long postId);

    @Query(name="Participant.getDepositCheckedNum", nativeQuery = true)
    Integer getDepositCheckedNum(@Param("postId") Long postId);
}
