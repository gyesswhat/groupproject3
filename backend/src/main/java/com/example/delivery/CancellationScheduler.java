package com.example.delivery;

import com.example.delivery.dto.CancelHostDto;
import com.example.delivery.dto.CancelPartDto;
import com.example.delivery.entity.Post;
import com.example.delivery.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class CancellationScheduler {

    @Autowired
    PostService postService;

    private final SimpMessagingTemplate messagingTemplate;

    public CancellationScheduler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 1000*60)
    public void cancelOrders() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis() - 30*60*1000);
        List<Post> expired = postService.findExpiredPosts(timestamp);

        for (Post expiredPost : expired) {
            // 방장에게 필요한 정보 찾기
            CancelHostDto forHost = postService.cancelHost(expiredPost);
            // 참여자에게 필요한 정보 찾기
            List<CancelPartDto> forPart = postService.cancelPart(expiredPost);
            // 보내기
            messagingTemplate.convertAndSend("/topic/cancel/host", forHost);
            messagingTemplate.convertAndSend("/topic/cancel/participant", forPart);
        }
    }
}
