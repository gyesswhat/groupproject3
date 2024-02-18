package com.example.delivery.service;

import com.example.delivery.dto.*;
import com.example.delivery.entity.Participant;
import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import com.example.delivery.repository.ParticipantRepository;
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
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ParticipantRepository participantRepository;

    public Post create(PostDto dto) {
        // 1. 엔티티 생성
        User user = userRepository.getReferenceById(dto.getUserId());
        Post post = dto.toEntity(user);
        // 2. createdAt 설정
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createdAt = simpleDateFormat.format(new Timestamp(System.currentTimeMillis()));
        post.setCreatedAt(createdAt);
        // 3. 에러 처리
        if (post.getPostId() != null) return null;
        // 4. 방장 participant에 추가 + 생성된 post 리턴
        Post created = postRepository.save(post);
        participantRepository.save(new Participant(null, post, user, createdAt, 0));
        return created;
    }

    public List<PostListDto> showPosts() {
        return postRepository.findPostList();
    }

    public PostDetailDto showPostDetail(Long postId) {
        return postRepository.findPostDetail(postId);
    }

    public List<ParticipantListDto> showParticipants(Long postId) {
        return postRepository.findParticipants(postId);
    }

    public String joinPost(Long postId, Long userId) {
        String msg = null; // 오류메시지 전달을 위함

        // 1. postId/userId 검증
        if (!postRepository.existsById(postId)) return "존재하지 않는 postId입니다.";
        if (!userRepository.existsById(userId)) return "존재하지 않는 userId입니다.";
        // 2. 엔티티 접근
        Post post = postRepository.findById(postId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        // 3. 참여 가능 여부 확인
        if (post.getPartNum() <= participantRepository.getPartNum(postId)) return "참여인원이 꽉 찼습니다.";
        // 4. 참여
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String joinedAt = simpleDateFormat.format(timestamp);
        Participant participant = new Participant(null, post, user, joinedAt, 1);
        participantRepository.save(participant);

        return msg;
    }

    public String depositPost(Long postId, Long userId) {
        String msg = null;
        Participant participant = participantRepository.findByPostIdAndUserId(postId, userId);
        if (participant==null) return "존재하지 않는 사용자입니다.";
        participant.setStatus(2);
        participantRepository.save(participant);
        return msg;
    }

    public String checkPost(Long postId, Long participantId) {
        String msg = null;
        Participant participant = participantRepository.findByPostIdAndUserId(postId, participantId);
        if (participant==null) return "존재하지 않는 사용자입니다.";
        participant.setStatus(3);
        participantRepository.save(participant);
        return msg;
    }
}
