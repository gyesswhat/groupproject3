package com.example.delivery.repository;

import com.example.delivery.entity.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long> {
    @Query(value = "SELECT * " +
            "FROM participant " +
            "WHERE post_post_id = :postId " +
            "AND user_id = :userId", nativeQuery = true)
    Participant findByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);

    @Query(value = "SELECT * " +
            "FROM participant " +
            "WHERE post_post_id = :postId", nativeQuery = true)
    List<Participant> findByPostId(@Param("postId") Long postId);

    @Query(value = "SELECT COUNT(*) " +
            "FROM participant " +
            "WHERE post_post_id = :postId", nativeQuery = true)
    Integer getPartNum(@Param("postId") Long postId);

    @Query(name="Participant.getDepositCheckedNum", nativeQuery = true)
    Integer getDepositCheckedNum(@Param("postId") Long postId);
}
