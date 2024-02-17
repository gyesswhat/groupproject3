package com.example.delivery.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Participant.getDepositCheckedNum",
                query = "SELECT COUNT(*) " +
                        "FROM participant " +
                        "WHERE post_post_id = :postId AND status = 3",
                resultSetMapping = "depositCheckedNumMapper"
        )
})
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "depositCheckedNumMapper",
                columns = {
                        @ColumnResult(name="depositCheckedNum", type= Integer.class)
                }
        )
})
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @ManyToOne
    @JoinColumn(name="post_postId")
    private Post post;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(nullable = false)
    private String joinedAt;

    @Column(nullable = false)
    private Integer status;
    // 0(방장), 1(입금전), 2(입금확인중), 3(입금확인완료)
}
