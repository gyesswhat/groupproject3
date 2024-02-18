package com.example.delivery.entity;

import com.example.delivery.dto.CommentDto;
import com.example.delivery.dto.CommentListDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@NamedNativeQuery(
        name = "Comment.findCommentList",
        query = "SELECT u.nickname, c.comment_body, c.created_at " +
                "FROM comment c " +
                "JOIN user u ON c.user_id = u.id " +
                "WHERE c.post_post_id = :postId",
        resultSetMapping = "commentListMapper"
)
@SqlResultSetMapping(
        name = "commentListMapper",
        classes = @ConstructorResult(
                targetClass = CommentListDto.class,
                columns = {
                        @ColumnResult(name = "nickname",type = String.class),
                        @ColumnResult(name = "comment_body",type = String.class),
                        @ColumnResult(name = "created_at", type = String.class)
                }
        )
)
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long commentId;
    @ManyToOne
    @JoinColumn(name="post_postId")
    private Post post;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(nullable = false)
    private String commentBody;
    @Column(nullable = false)
    private String createdAt;

    public void patch(CommentDto dto) {
        // 객체 갱신
        if (dto.getCommentBody() != null) // 수정할 닉네임 데이터가 있다면
            this.commentBody = dto.getCommentBody(); // 내용 반영
    }
}
