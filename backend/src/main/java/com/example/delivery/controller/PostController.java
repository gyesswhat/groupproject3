package com.example.delivery.controller;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostDto;
import com.example.delivery.dto.PostListDto;
import com.example.delivery.entity.Post;
import com.example.delivery.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostService postService;

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

    @GetMapping("/posts/{PostId}")
    public ResponseEntity<PostDetailDto> showPostDetail(@PathVariable Integer PostId) {
        PostDetailDto response = postService.showPostDetail(PostId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/posts/{PostId}/participants")
    public ResponseEntity<List<ParticipantListDto>> showParticipants(@PathVariable Integer PostId) {
        List<ParticipantListDto> responses = postService.showParticipants(PostId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

//    @PostMapping("/posts/{PostId}/join")
//    public ResponseEntity<String> join(@PathVariable Integer PostId) {
//
//    }
}
