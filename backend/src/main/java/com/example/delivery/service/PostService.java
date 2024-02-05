package com.example.delivery.service;

import com.example.delivery.dto.*;
import com.example.delivery.entity.Post;
import com.example.delivery.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post create(PostDto dto) {
        Post post = dto.toEntity();
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        if (post.getPostId() != null) return null; // 기타 대비...
        return postRepository.save(post);
    }

    public List<PostListDto> showPosts() {
        List<PostListDto> responses = postRepository.findPostList(); // 다 가져오기
        return responses;
    }

    public PostDetailDto showPostDetail(Integer PostId) {
        PostDetailDto response = postRepository.findPostDetail(PostId);
        return response;
    }

    public List<ParticipantListDto> showParticipants(Integer PostId) {
        List<ParticipantListDto> responses = postRepository.findParticipants(PostId);
        return responses;
    }
}
