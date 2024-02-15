package com.example.delivery.service;

import com.example.delivery.dto.*;
import com.example.delivery.entity.Participant;
import com.example.delivery.entity.ParticipantPK;
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
        ParticipantPK pk = new ParticipantPK(post.getPostId(), user.getId());
        participantRepository.save(new Participant(pk, post, user, createdAt, 1));
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
        ParticipantPK pk = new ParticipantPK(post.getPostId(), user.getId());
        Participant participant = new Participant(pk, post, user, joinedAt, 1);
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

//    public List<Post> findPostsToCheck(Timestamp timestamp) {
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String checkBy = simpleDateFormat.format(timestamp);
//        return postRepository.findExpiredPosts(checkBy);
//    }
//
//    public CancelHostDto cancelHost(Post expiredPost) {
//        Long postId = expiredPost.getPostId();  // 1) 취소 예정 Post
//        Long userId = expiredPost.getUser().getId(); // 2) 취소 예정 Post의 방장 ID
//        List<String> accountInfo = null; // 3) 취소 예정 Post의 참여자 계좌 정보 리스트
//        List<Participant> participants = participantRepository.findByPostId(postId);
//        for (Participant participant : participants) {
//            if (participant.getStatus()==0) continue; // 방장이면 빼기
//            String bank = participant.getUser().getBank();
//            String account = participant.getUser().getAccount();
//            accountInfo.add(bank + account);
//        }
//        CancelHostDto forHost = new CancelHostDto(postId, userId, accountInfo);
//        return forHost;
//    }
//
//    public List<CancelPartDto> cancelPart(Post expiredPost) {
//        List<CancelPartDto> forPart = null;
//        Long postId = expiredPost.getPostId();
//        List<Participant> participants = participantRepository.findByPostId(postId);
//        for (Participant participant : participants) {
//            if (participant.getStatus()==0) continue; // 방장이면 빼기
//            CancelPartDto user = new CancelPartDto(
//                    participant.getPost().getPostId(),
//                    participant.getUser().getId()); // DTO 생성
//            forPart.add(user); // DTO list에 추가
//        }
//        return forPart;
//    }
}
