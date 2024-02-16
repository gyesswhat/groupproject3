package com.example.delivery.repository;

import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    @Query(name = "Comment.findCommentList", nativeQuery = true)
    List<CommentListDto> findCommentList(@Param("postId") Long postId);
}
