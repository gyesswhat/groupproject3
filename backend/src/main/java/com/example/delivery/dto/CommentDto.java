package com.example.delivery.dto;

import com.example.delivery.entity.Comment;
import com.example.delivery.entity.Post;
import com.example.delivery.entity.User;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long commentId;
    private Long postId;
    private Long userId;
    private String commentBody;
    private String createdAt;

    public static CommentDto createCommentDto(Comment comment) {
        return new CommentDto(
                comment.getCommentId(),
                comment.getPost().getPostId(),
                comment.getUser().getId(),
                comment.getCommentBody(),
                comment.getCreatedAt()
        );
    }

    public Comment toEntity(Post post, User user) {
        return new Comment(null, post, user, commentBody, null);
    }
}
