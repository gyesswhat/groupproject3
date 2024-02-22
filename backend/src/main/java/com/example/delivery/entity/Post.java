package com.example.delivery.entity;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostHistoryDto;
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
                query = "SELECT p.post_id, p.created_at, p.location, p.restaurant, p.menu, p.price, p.part_num, " +
                        "COUNT(pt.post_post_id) AS now_num, " +
                        "u.nickname, p.category, p.is_valid " +
                        "FROM post p " +
                        "JOIN user u ON p.user_id = u.id " +
                        "LEFT JOIN participant pt ON p.post_id = pt.post_post_id " +
                        "GROUP BY p.post_id",
                resultSetMapping = "postListMapper"
        ),
        @NamedNativeQuery(
                name = "Post.findPostDetail",
                query = "SELECT created_at, user_id, location, restaurant, menu, part_num, price, post_body " +
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
                query = "SELECT p.post_id, p.created_at, u.nickname, p.restaurant, p.menu, p.price, p.part_num, p.is_valid " +
                        "FROM post p " +
                        "INNER JOIN user u ON p.user_id = u.id " +
                        "INNER JOIN participant pr ON p.post_id = pr.post_post_id " +
                        "WHERE pr.user_id = :userId " +
                        "GROUP BY p.post_id",
                resultSetMapping = "myPostListMapper"
        )
})
@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "postListMapper",
                classes = @ConstructorResult(
                        targetClass = PostListDto.class,
                        columns = {
                                @ColumnResult(name="post_id", type=Long.class),
                                @ColumnResult(name="created_at", type=String.class),
                                @ColumnResult(name="location", type=String.class),
                                @ColumnResult(name="restaurant", type=String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="part_num", type=Integer.class),
                                @ColumnResult(name="now_num", type=Integer.class),
                                @ColumnResult(name="nickname", type=String.class),
                                @ColumnResult(name="category", type=String.class),
                                @ColumnResult(name="is_valid", type=Integer.class)
                        }
                )
        ),
        @SqlResultSetMapping(
                name = "postDetailMapper",
                classes = @ConstructorResult(
                        targetClass = PostDetailDto.class,
                        columns = {
                                @ColumnResult(name="created_at", type=String.class),
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
        ),
        @SqlResultSetMapping(
                name = "myPostListMapper",
                classes = @ConstructorResult(
                        targetClass = PostHistoryDto.class,
                        columns = {
                                @ColumnResult(name="post_id", type=Long.class),
                                @ColumnResult(name="created_at", type=String.class),
                                @ColumnResult(name="nickname", type=String.class),
                                @ColumnResult(name="restaurant", type= String.class),
                                @ColumnResult(name="menu", type=String.class),
                                @ColumnResult(name="price", type=Integer.class),
                                @ColumnResult(name="part_num", type=Integer.class),
                                @ColumnResult(name="is_valid",type= Integer.class)
                        }
                )
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
