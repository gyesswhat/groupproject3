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
    @Query(name="Post.findPostList", nativeQuery = true)
    ArrayList<PostListDto> findPostList();

    @Query(name="Post.findPostDetail", nativeQuery = true)
    PostDetailDto findPostDetail(@Param("postId") Long PostId);

    @Query(name="Post.findParticipants", nativeQuery = true)
    List<ParticipantListDto> findParticipants(@Param("postId") Long postId);

    @Query(name="Post.findPostIdsToCheck", nativeQuery = true)
    List<Long> findPostIdsToCheck(@Param("checkBy") String checkBy);

    @Query(name = "Post.findPostListInMyPage", nativeQuery = true)
    List<PostListDto> findPostListInMyPage(@Param("userId") Long userId);
}
