package com.example.delivery.entity;

import com.example.delivery.dto.CommentDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor // 생성자 자동 생성
@NoArgsConstructor // 기본생성자 자동 생성
@ToString // toString() 자동생성
@Setter
@Getter // 게터 만들어줌
public class Comment {
    // - comment_id(댓글 아이디): INT
    //    - PRIMARY KEY
    //- post_id(게시글 아이디): INT
    //    - 외래 키
    //- user_id(유저 아이디): INT
    //    - 외래 키
    //- comment_body(댓글 내용): VARCHAR(255)
    //- created_at(생성 시간): TIMESTAMP

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
