package com.example.delivery.controller;

import com.example.delivery.dto.CommentDto;
import com.example.delivery.dto.CommentListDto;
import com.example.delivery.entity.Comment;
import com.example.delivery.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    // POST
    @PostMapping("/posts/{postId}/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentDto dto) {
        Comment comment = commentService.createComment(dto);
        return (comment != null) ?
                ResponseEntity.status(HttpStatus.OK).body(comment) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성에 실패했습니다.");
    }

    // GET
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<?> showComments(@PathVariable Long postId) {
        List<CommentListDto> responses = commentService.showComments(postId);
        return (responses != null) ?
                ResponseEntity.status(HttpStatus.OK).body(responses) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 조회에 실패했습니다.");
    }

    // PATCH
    @PatchMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<?> patchComment(@PathVariable Long commentId, @RequestBody CommentDto dto) {
        CommentDto patched = commentService.patchComment(commentId, dto);
        return (patched != null) ?
                ResponseEntity.status(HttpStatus.OK).body(patched) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대상 댓글이 없습니다.");
    }

    // DELETE
    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        CommentDto deleted = commentService.deleteComment(commentId);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).body(deleted) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("대상 댓글이 없습니다.");
    }
}
