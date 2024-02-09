package com.example.delivery.service;

import com.example.delivery.dto.CommentDto;
import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import com.example.delivery.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    public Comment createComment(CommentDto dto) {
        Comment comment = dto.toEntity();
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        if (comment.getCommentId() != null) return null;
        return commentRepository.save(comment);
    }

    public List<CommentListDto> showComments(Integer postId) {
        List<CommentListDto> responses = commentRepository.findCommentList(postId);
        return responses;
    }

    public CommentDto patchComment(Integer commentId, CommentDto dto) {
        Comment target = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("대상 댓글이 없는 경우"));
        target.patch(dto);
        Comment updated = commentRepository.save(target);
        return CommentDto.createCommentDto(updated);
    }

    public CommentDto deleteComment(Integer commentId) {
        Comment target = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("대상 댓글이 없는 경우"));
        commentRepository.delete(target);
        return CommentDto.createCommentDto(target);
    }
}
