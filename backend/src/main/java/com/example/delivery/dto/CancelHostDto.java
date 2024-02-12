package com.example.delivery.dto;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class CancelHostDto {
    // 방장
    // 취소예정postid + 방장userid + 참여자 계좌정보 List

    private Long postId;
    private Long userId;
    private List<String> accountInfo;
}
