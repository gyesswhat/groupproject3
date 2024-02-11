package com.example.delivery.repository;

import com.example.delivery.dto.ParticipantListDto;
import com.example.delivery.dto.PostDetailDto;
import com.example.delivery.dto.PostListDto;
import com.example.delivery.dto.UserPartPostList;
import com.example.delivery.entity.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer>{
    @Override
    ArrayList<Post> findAll();

    // "[
    //{
    //	“createdAt”: ""2023-12-31 12:00:00""
    //        “restaurant”: “BBQ 신촌점”,
    //        “menu”: “황금올리브”,
    //        “price”: 7000,
    //        "partNum": 4,
    //        ""nickname"": ""폼폼푸린""
    //}
    //]"
    @Query("SELECT new com.example.delivery.dto.PostListDto(p.createdAt, p.restaurant, p.menu, p.price, p.partNum, u.nickname) " +
            "FROM Post p " +
            "JOIN User u ON p.userId = u.userId") // 유저 쪽 완성되면...
    ArrayList<PostListDto> findPostList();

    // {
    //        “location”: “한우리집”,
    //        “restaurant”: “BBQ 신촌점”,
    //        “menu”: “황금올리브”,
    //        “partNum”: 4,
    //        “price”: 7000,
    //        “postBody”: “같이 먹어요”
    //}
    @Query("SELECT new com.example.delivery.dto.PostDetailDto(p.location, p.restaurant, p.menu, p.partNum, p.price, p.PostBody)" +
            "FROM Post p " +
            "WHERE p.postId = :PostId")
    PostDetailDto findPostDetail(@Param("postId") Integer PostId);

    //  [
    //{
    //        "nickname": "화연",
    //        "joinedAt": "2024-1-1 12:00:00"
    //        "status": "입금 확인 중"
    //}
    //]
    @Query("SELECT new com.example.delivery.dto.ParticipantListDto(u.nickname, pr.joinedAt, pr.status)" +
            "FROM Participant pr " +
            "JOIN User u ON pr.userId = u.userId " + // 유저 쪽 완성되면...
            "WHERE pr.postId = :postId")
    List<ParticipantListDto> findParticipants(@Param("postId") Integer postId);

    @Query(value = "SELECT new com.example.delivery.dto.UserPartPostList(p.createdAt, p.restaurant, p.menu, p.price, p.partNum, u.nickname)" +
                    "FROM Post p" +
                    "JOIN Participant pr ON pr.postId = p.postId" +
                    "AND pr.userId = :userId")
    ArrayList<UserPartPostList> findUserPartPostList(@Param("userId") Long userId);
}
