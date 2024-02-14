package com.example.delivery.repository;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostListDto;
import com.example.delivery.entity.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Long>{
    @Query("SELECT new com.example.delivery.dto.PostListDto(p.createdAt, p.restaurant, p.menu, p.price, p.partNum, u.nickname) " +
            "FROM Post p " +
            "JOIN User u ON p.user.id = u.id")
    ArrayList<PostListDto> findPostList();

    @Query("SELECT new com.example.delivery.dto.PostDetailDto(p.location, p.restaurant, p.menu, p.partNum, p.price, p.postBody)" +
            "FROM Post p " +
            "WHERE p.postId = :PostId")
    PostDetailDto findPostDetail(@Param("postId") Long PostId);

    @Query("SELECT new com.example.delivery.dto.ParticipantListDto(u.nickname, pr.joinedAt, pr.status)" +
            "FROM Participant pr " +
            "JOIN User u ON pr.user.id = u.id " +
            "WHERE pr.post.postId = :postId")
    List<ParticipantListDto> findParticipants(@Param("postId") Long postId);

    @Query("SELECT p " +
            "FROM Post p " +
            "WHERE CAST(p.createdAt AS String) <= :checkBy")
    List<Post> findExpiredPosts(String checkBy);
}
