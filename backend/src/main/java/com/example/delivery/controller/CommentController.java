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
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto dto) {
        Comment comment = commentService.createComment(dto);
        return (comment != null) ?
                ResponseEntity.status(HttpStatus.OK).body(comment) :
                null;
    }

    // GET
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<CommentListDto>> showComments(@PathVariable Long postId) {
        List<CommentListDto> responses = commentService.showComments(postId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    // PATCH
    @PatchMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<CommentDto> patchComment(@PathVariable Long commentId, @RequestBody CommentDto dto) {
        CommentDto patched = commentService.patchComment(commentId, dto);
        return (patched != null) ?
                ResponseEntity.status(HttpStatus.OK).body(patched) :
                null;
    }

    // DELETE
    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<CommentDto> deleteComment(@PathVariable Long commentId) {
        CommentDto deleted = commentService.deleteComment(commentId);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).body(deleted) :
                null;
    }
}
