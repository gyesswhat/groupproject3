package com.example.delivery.dto;

import com.example.delivery.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.sql.Timestamp;

@AllArgsConstructor
@ToString
@Getter
public class CommentDto {
    // - comment_id(댓글 아이디): INT
    //    - PRIMARY KEY
    //- post_id(게시글 아이디): INT
    //    - 외래 키
    //- user_id(유저 아이디): INT
    //    - 외래 키
    //- comment_body(댓글 내용): VARCHAR(255)
    //- created_at(생성 시간): TIMESTAMP

    private Integer commentId;
    private Integer postId;
    private Integer userId;
    private String commentBody;
    private Timestamp createdAt;

    public static CommentDto createCommentDto(Comment comment) {
        return new CommentDto(
                comment.getCommentId(),
                comment.getPostId(),
                comment.getUserId(),
                comment.getCommentBody(),
                comment.getCreatedAt()
        );
    }

    public Comment toEntity() {
        return new Comment(commentId, postId, userId, commentBody, createdAt);
    }
}
