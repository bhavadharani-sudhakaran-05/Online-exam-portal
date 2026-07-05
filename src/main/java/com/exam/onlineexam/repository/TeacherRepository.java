package com.exam.onlineexam.repository;

import com.exam.onlineexam.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByLoginId(String loginId);
}
