package com.example.delivery.dto;

import com.example.delivery.entity.Comment;
import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public class CommentDto {
    private Long commentId;
    private Post post;
    private User user;
    private String commentBody;
    private String createdAt;

    public static CommentDto createCommentDto(Comment comment) {
        return new CommentDto(
                comment.getCommentId(),
                comment.getPost(),
                comment.getUser(),
                comment.getCommentBody(),
                comment.getCreatedAt()
        );
    }

    public Comment toEntity() {
        return new Comment(commentId, post, user, commentBody, createdAt);
    }
}
