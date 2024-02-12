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
        User user = userRepository.getReferenceById(dto.getUserId());
        Post post = dto.toEntity(user);
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        post.setCreatedAt(simpleDateFormat.format(createdAt));

        if (post.getPostId() != null) return null; // 기타 대비...
        return postRepository.save(post);
    }

    public List<PostListDto> showPosts() {
        List<PostListDto> responses = postRepository.findPostList(); // 다 가져오기
        return responses;
    }

    public PostDetailDto showPostDetail(Long PostId) {
        PostDetailDto response = postRepository.findPostDetail(PostId);
        return response;
    }

    public List<ParticipantListDto> showParticipants(Long PostId) {
        List<ParticipantListDto> responses = postRepository.findParticipants(PostId);
        return responses;
    }

    public String joinPost(Long postId, Long userId) {
        String msg = null;

        if (!postRepository.existsById(postId)) return "존재하지 않는 postId입니다.";
        if (!userRepository.existsById(userId)) return "존재하지 않는 userId입니다.";

        Post post = postRepository.findById(postId).orElse(null);

        User user = userRepository.findById(userId).orElse(null);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String joinedAt = simpleDateFormat.format(timestamp);

        int status;
        if (post.getUser() == user) status=0;
        else status=1;

        Participant participant = new Participant(post, user, joinedAt, status);
        participantRepository.save(participant);

        return msg;
    }

    public String depositPost(Long postId, Long userId) {
        String msg = null;
        Participant participant = participantRepository.findByPostIdAndUserId(postId, userId);
        if (participant==null) return "존재하지 않는 사용자입니다.";
        participant.setStatus(2);
        return msg;
    }

    public String checkPost(Long postId, Long participantId) {
        String msg = null;
        Participant participant = participantRepository.findByPostIdAndUserId(postId, participantId);
        if (participant==null) return "존재하지 않는 사용자입니다.";
        participant.setStatus(3);
        return msg;
    }

    public List<Post> findExpiredPosts(Timestamp timestamp) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String checkBy = simpleDateFormat.format(timestamp);
        return postRepository.findExpiredPosts(checkBy);
    }

    public CancelHostDto cancelHost(Post expiredPost) {
        Long postId = expiredPost.getPostId();  // 1) 취소 예정 Post
        Long userId = expiredPost.getUser().getId(); // 2) 취소 예정 Post의 방장 ID
        List<String> accountInfo = null; // 3) 취소 예정 Post의 참여자 계좌 정보 리스트
        List<Participant> participants = participantRepository.findByPostId(postId);
        for (Participant participant : participants) {
            if (participant.getStatus()==0) continue; // 방장이면 빼기
            String bank = participant.getUser().getBank();
            String account = participant.getUser().getAccount();
            accountInfo.add(bank + account);
        }
        CancelHostDto forHost = new CancelHostDto(postId, userId, accountInfo);
        return forHost;
    }

    public List<CancelPartDto> cancelPart(Post expiredPost) {
        List<CancelPartDto> forPart = null;
        Long postId = expiredPost.getPostId();
        List<Participant> participants = participantRepository.findByPostId(postId);
        for (Participant participant : participants) {
            if (participant.getStatus()==0) continue; // 방장이면 빼기
            CancelPartDto user = new CancelPartDto(
                    participant.getPost().getPostId(),
                    participant.getUser().getId()); // DTO 생성
            forPart.add(user); // DTO list에 추가
        }
        return forPart;
    }
}
