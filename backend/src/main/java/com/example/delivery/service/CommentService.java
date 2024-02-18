package com.example.delivery.service;

import com.example.delivery.dto.CommentDto;
import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import com.example.delivery.repository.CommentRepository;
import com.example.delivery.repository.PostRepository;
import com.example.delivery.repository.UserRepository;
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
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    public Comment createComment(Long postId, CommentDto dto) {
        // 1. 엔티티 생성
        Post post = postRepository.findById(postId).orElse(null);
        User user = userRepository.getReferenceById(dto.getUserId());
        Comment comment = dto.toEntity(post, user);
        // 2. createdAt 설정
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        comment.setCreatedAt(simpleDateFormat.format(createdAt));
        // 3. 에러 처리
        if (comment.getCommentId() != null) return null;
        // 4. 생성된 Comment 리턴
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
