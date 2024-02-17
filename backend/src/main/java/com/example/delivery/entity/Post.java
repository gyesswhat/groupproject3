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
                query = "SELECT p.created_at, p.restaurant, p.menu, p.price, p.part_num, u.nickname, p.is_valid " +
                        "FROM post p " +
                        "JOIN user u ON p.user_id = u.id",
                resultSetMapping = "postListMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostDetail",
                query = "SELECT user_id, location, restaurant, menu, part_num, price, post_body " +
                        "FROM post " +
                        "WHERE post_id = :postId",
                resultSetMapping = "postDetailMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findParticipants",
                query = "SELECT u.nickname, pr.joined_at, pr.status, u.account, u.bank " +
                        "FROM participant pr " +
                        "JOIN user u ON pr.user_id = u.id " +
                        "WHERE pr.post_post_id = :postId",
                resultSetMapping = "participantsMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostIdsToCheck",
                query = "SELECT post_id " +
                        "FROM post " +
                        "WHERE created_at <= :checkBy",
                resultSetMapping = "postIdsToCheckMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostListInMyPage",
                query = "SELECT p.created_at, p.restaurant, p.menu, p.price, p.part_num, u.nickname, p.is_valid " +
                        "FROM post p ,user u ,participant pr " +
                        "WHERE pr.user_id = :userId " +
                        "AND (p.is_valid = 1 OR p.is_valid = 4)",
                resultSetMapping = "postListMapper"
        )
})
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "postListMapper",
                classes = @ConstructorResult(
                        targetClass = PostListDto.class,
                        columns = {
                                @ColumnResult(name="created_at", type=String.class),
                                @ColumnResult(name="restaurant", type=String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="part_num", type=Integer.class),
                                @ColumnResult(name="nickname", type=String.class),
                                @ColumnResult(name="is_valid", type=Integer.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "postDetailMapper",
                classes = @ConstructorResult(
                        targetClass = PostDetailDto.class,
                        columns = {
                                @ColumnResult(name="user_id", type=Long.class),
                                @ColumnResult(name="location", type=String.class),
                                @ColumnResult(name="restaurant", type=String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="part_num", type=Integer.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="post_body", type=String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "participantsMapper",
                classes = @ConstructorResult(
                        targetClass = ParticipantListDto.class,
                        columns = {
                                @ColumnResult(name="nickname", type=String.class),
                                @ColumnResult(name="joined_at", type=String.class),
                                @ColumnResult(name="status", type=Integer.class),
                                @ColumnResult(name="account", type=String.class),
                                @ColumnResult(name="bank", type=String.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "postIdsToCheckMapper",
                columns = {
                        @ColumnResult(name="post_id", type=Long.class)
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
    @Column(nullable = false) private Integer isValid;

}
