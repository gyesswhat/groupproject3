package com.example.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@AllArgsConstructor
@ToString
public class PostListDto {
    // "[
    //{
    //	“createdAt”: ""2023-12-31 12:00:00""
    //        “restaurant”: “BBQ 신촌점”,
    //        “menu”: “황금올리브”,
    //        “price”: 7000,
    //        "partNum": 4,
    //        "nickname": "폼폼푸린"
    //}
    //]"

    private Timestamp createdAt;
    private String restaurant;
    private String menu;
    private int price;
    private int partNum;
    private String nickname;
}
