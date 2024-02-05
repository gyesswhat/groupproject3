package com.example.delivery.repository;

import com.example.delivery.entity.Participant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer> {
    // postId, userId 따라서 그 글의 그것만... 리턴해주는... 아 빡세네
    // 기본키가 두개일때는 어케해야하져 아예 sql문으로 찾아야되나
}
