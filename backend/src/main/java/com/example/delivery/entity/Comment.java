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
        query = "SELECT u.nickname, c.commentBody, c.createdAt" +
                "FROM Comment c" +
                "JOIN User u ON c.user.id = u.id" +
                "WHERE c.post.postId = :postId",
        resultSetMapping = "commentListMapper"
)
@SqlResultSetMapping(
        name = "commentListMapper",
        classes = @ConstructorResult(
                targetClass = CommentListDto.class,
                columns = {
                        @ColumnResult(name = "nickname",type = String.class),
                        @ColumnResult(name = "commentBody",type = String.class),
                        @ColumnResult(name = "createdAt", type = String.class)
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
        // 예외 발생
        if (this.commentId != dto.getCommentId())
            throw new IllegalArgumentException("댓글 수정 실패! 잘못된 id가 입력되었습니다.");
        // 객체 갱신
        if (dto.getCommentBody() != null) // 수정할 닉네임 데이터가 있다면
            this.commentBody = dto.getCommentBody(); // 내용 반영
    }
}
