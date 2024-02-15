package com.example.delivery.entity;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostListDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Table(name="post")

@NamedNativeQueries({
        @NamedNativeQuery(
                name = "Post.findPostList",
                query = "SELECT p.createdAt, p.restaurant, p.menu, p.price, p.partNum, u.nickname " +
                        "FROM post p " +
                        "JOIN user u ON p.userId = u.id",
                resultSetMapping = "postListMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostDetail",
                query = "SELECT user.id, location, restaurant, menu, partNum, price, postBody " +
                        "FROM post " +
                        "WHERE postId = :postId",
                resultSetMapping = "postDetailMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findParticipants",
                query = "SELECT u.nickname, pr.joinedAt, pr.status, u.account, u.bank " +
                        "FROM participant pr " +
                        "JOIN user u ON pr.user.id = u.id " +
                        "WHERE pr.post.id = :postId",
                resultSetMapping = "participantsMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostIdsToCheck",
                query = "SELECT postId " +
                        "FROM post " +
                        "WHERE createdAt <= :checkBy",
                resultSetMapping = "postIdsToCheckMapper"
        )
})
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "postListMapper",
                classes = @ConstructorResult(
                        targetClass = PostListDto.class,
                        columns = {
                                @ColumnResult(name="createdAt", type=String.class),
                                @ColumnResult(name="restaurant", type=String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="partNum", type=Integer.class),
                                @ColumnResult(name="nickname", type=String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "postDetailMapper",
                classes = @ConstructorResult(
                        targetClass = PostDetailDto.class,
                        columns = {
                                @ColumnResult(name="userId", type=Long.class),
                                @ColumnResult(name="location", type=String.class),
                                @ColumnResult(name="restaurant", type=String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="partNum", type=Integer.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="postBody", type=String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "participantsMapper",
                classes = @ConstructorResult(
                        targetClass = ParticipantListDto.class,
                        columns = {
                                @ColumnResult(name="nickname", type=String.class),
                                @ColumnResult(name="joinedAt", type=String.class),
                                @ColumnResult(name="status", type=Integer.class),
                                @ColumnResult(name="account", type=String.class),
                                @ColumnResult(name="bank", type=String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "postIdsToCheckMapper",
                columns = {
                        @ColumnResult(name="postId", type=Long.class)
                }
        )
})
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long postId;
    @ManyToOne
    @JoinColumn(name = "user_id") private User user;
    @Column(nullable = false) private String location;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String restaurant;
    @Column(nullable = false) private String menu;
    @Column(nullable = false) private Integer partNum;
    @Column(nullable = false) private Integer price;
    @Column private String postBody;
    @Column(nullable = false) private String createdAt;
    @Column(nullable = false) private int isValid;

}
