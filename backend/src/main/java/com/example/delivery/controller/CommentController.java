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
    @PostMapping("/posts/{PostId}/comment")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto dto) {
        Comment comment = commentService.createComment(dto);
        return (comment != null) ?
                ResponseEntity.status(HttpStatus.OK).body(comment) :
                null;
    }

    // GET
    @GetMapping("/posts/{PostId}/comments")
    public ResponseEntity<List<CommentListDto>> showComments(@PathVariable Integer PostId) {
        List<CommentListDto> responses = commentService.showComments(PostId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    // PATCH
    @PatchMapping("/posts/{PostId}/comments/{CommentId}")
    public ResponseEntity<CommentDto> patchComment(@PathVariable Integer CommentId, @RequestBody CommentDto dto) {
        CommentDto patched = commentService.patchComment(CommentId, dto);
        return (patched != null) ?
                ResponseEntity.status(HttpStatus.OK).body(patched) :
                null;
    }

    // DELETE
    @DeleteMapping("/posts/{PostId}/comments/{CommentId}")
    public ResponseEntity<CommentDto> deleteComment(@PathVariable Integer CommentId) {
        CommentDto deleted = commentService.deleteComment(CommentId);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.OK).body(deleted) :
                null;
    }
}
