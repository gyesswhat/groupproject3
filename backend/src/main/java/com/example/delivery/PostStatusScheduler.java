package com.example.delivery;

import com.example.delivery.entity.Post;
import com.example.delivery.repository.ParticipantRepository;
import com.example.delivery.repository.PostRepository;
import com.example.delivery.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class PostStatusScheduler {
    @Autowired
    PostService postService;
    @Autowired
    PostRepository postRepository;
    @Autowired
    ParticipantRepository participantRepository;

    // 1. 주문성공
    //    → 글을 올린지 30분이 지났든 지나지 않았든 목표한 인원을 다 채우고, 모두 입금을 한 경우
    //2. 주문실패2
    //    → 글을 올린지 30분이 지났음에도 인원을 못채우고 시간이 지난 경우 (환불 필요)
    //3. 주문실패3
    //    → 글을 올린지 30분이 지났음에도 인원은 채웠지만 모두 입금하지 않아서 실패된 경우 (환불 필요)
    //4. 주문 진행중
    //    → 글을 올린지 30분이 지나지 않은 경우

    @Scheduled(fixedDelay = 1000*60)
    public void changePostStatus() {
        // 1. 상태 확인할 Post 리스트 가져오기
        Timestamp timestamp = new Timestamp(System.currentTimeMillis() - 30*60*1000);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String checkBy = simpleDateFormat.format(timestamp);
        List<Long> postIdsToCheck = postRepository.findPostIdsToCheck(checkBy);
        // 2. Post 상태변경
        for (Long postId : postIdsToCheck) {
            Post post = postRepository.findById(postId).orElse(null);
            int targetPartNum = post.getPartNum();
            int nowPartNum = participantRepository.getPartNum(postId);

            if (targetPartNum > nowPartNum) post.setIsValid(2); // 주문 실패(인원 못 채움)
            else {
                int depositCheckedNum = participantRepository.getDepositCheckedNum(postId);
                if (targetPartNum == depositCheckedNum) post.setIsValid(1); // 주문 성공
                else post.setIsValid(3); // 주문 실패(입금 안 함)
            }
        }
    }
}
