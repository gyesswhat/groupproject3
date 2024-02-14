package com.example.delivery.controller;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostDto;
import com.example.delivery.dto.PostListDto;
import com.example.delivery.entity.Post;
import com.example.delivery.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostService postService;
    @Autowired
    private HttpSession session;

    @PostMapping("/post")
    public ResponseEntity<Post> create(@RequestBody PostDto dto) {
        Post created = postService.create(dto);
        return (created != null) ? // 생성하면 정상, 실패하면 오류
                ResponseEntity.status(HttpStatus.OK).body(created) : // 성공시
                null; // 실패시
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostListDto>> showPosts() {
        List<PostListDto> responses = postService.showPosts();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDetailDto> showPostDetail(@PathVariable Long postId) {
        PostDetailDto response = postService.showPostDetail(postId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/posts/{postId}/participants")
    public ResponseEntity<List<ParticipantListDto>> showParticipants(@PathVariable Long postId) {
        List<ParticipantListDto> responses = postService.showParticipants(postId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @PostMapping("/posts/{postId}/join")
    public ResponseEntity<String> join(@PathVariable Long postId) {
        Long userId = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        String msg = postService.joinPost(postId, userId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }

    @PostMapping("/posts/{postId}/deposit")
    public ResponseEntity<String> deposit(@PathVariable Long postId) {
        Long userId = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        String msg = postService.depositPost(postId, userId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }

    @PostMapping("/posts/{postId}/check/{ParticipantId}")
    public ResponseEntity<String> check(@PathVariable Long postId, @PathVariable Long ParticipantId) {
        String msg = postService.checkPost(postId, ParticipantId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }
}
