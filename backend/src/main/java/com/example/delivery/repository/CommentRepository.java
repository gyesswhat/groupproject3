package com.example.delivery.repository;

import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    @Override
    ArrayList<Comment> findAll();

    @Query("SELECT new com.example.delivery.dto.CommentListDto(u.nickname, c.commentBody, c.createdAt) " +
            "FROM Comment c " +
            "JOIN User u ON c.userId = u.userId")
    List<CommentListDto> findCommentList(Integer postId);
}
