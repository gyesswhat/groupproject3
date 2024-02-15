package com.example.delivery.service;

import com.example.delivery.dto.CommentDto;
import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import com.example.delivery.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Slf4j
@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    public Comment createComment(CommentDto dto) {
        Comment comment = dto.toEntity();
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        comment.setCreatedAt(simpleDateFormat.format(createdAt));
        if (comment.getCommentId() != null) return null;
        return commentRepository.save(comment);
    }

    public List<CommentListDto> showComments(Long postId) {
        return commentRepository.findCommentList(postId);
    }

    public CommentDto patchComment(Long commentId, CommentDto dto) {
        Comment target = commentRepository.findById(commentId).orElse(null);
        if (target==null) return null;
        target.patch(dto);
        Comment updated = commentRepository.save(target);
        return CommentDto.createCommentDto(updated);
    }

    public CommentDto deleteComment(Long commentId) {
        Comment target = commentRepository.findById(commentId).orElse(null);
        if (target==null) return null;
        commentRepository.delete(target);
        return CommentDto.createCommentDto(target);
    }
}
