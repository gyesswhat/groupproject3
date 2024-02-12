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
    @Query("SELECT new com.example.delivery.dto.CommentListDto(u.nickname, c.commentBody, c.createdAt) " +
            "FROM Comment c " +
            "JOIN User u ON c.user.id = u.id " +
            "WHERE c.post.postId = :postId")
    List<CommentListDto> findCommentList(@Param("postId") Long postId);
}
