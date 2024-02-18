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
    public ResponseEntity<?> create(@RequestBody PostDto dto) {
        Post created = postService.create(dto);
        return (created != null) ?
                ResponseEntity.status(HttpStatus.OK).body(created) : // 성공시
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("저장에 실패했습니다.");
    }

    @GetMapping("/posts")
    public ResponseEntity<?> showPosts() {
        List<PostListDto> responses = postService.showPosts();
        return (responses != null) ?
                ResponseEntity.status(HttpStatus.OK).body(responses) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 불러오기에 실패했습니다.");
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<?> showPostDetail(@PathVariable(name = "postId") Long postId) {
        PostDetailDto response = postService.showPostDetail(postId);
        return (response != null) ?
                ResponseEntity.status(HttpStatus.OK).body(response) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 불러오기에 실패했습니다.");
    }

    @GetMapping("/posts/{postId}/participants")
    public ResponseEntity<?> showParticipants(@PathVariable(name = "postId") Long postId) {
        List<ParticipantListDto> responses = postService.showParticipants(postId);
        return (responses != null) ?
                ResponseEntity.status(HttpStatus.OK).body(responses) :
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("참여자 불러오기에 실패했습니다.");
    }

    @PostMapping("/posts/{postId}/join")
    public ResponseEntity<?> join(@PathVariable(name = "postId") Long postId) {
        Long userId = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        String msg = postService.joinPost(postId, userId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }

    @PostMapping("/posts/{postId}/deposit")
    public ResponseEntity<String> deposit(@PathVariable(name = "postId") Long postId) {
        Long userId = Long.valueOf(String.valueOf(session.getAttribute("userId")));
        String msg = postService.depositPost(postId, userId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }

    @PostMapping("/posts/{postId}/check/{participantId}")
    public ResponseEntity<String> check(@PathVariable(name = "postId") Long postId, @PathVariable(name = "participantId") Long ParticipantId) {
        String msg = postService.checkPost(postId, ParticipantId);
        return (msg == null) ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }
}
