package com.exam.onlineexam.controller;

import com.exam.onlineexam.entity.Teacher;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/teacher")
public class TeacherSessionController {

    @GetMapping("/me")
    public Teacher me(HttpSession session) {
        Teacher teacher = (Teacher) session.getAttribute("loggedInTeacher");
        if (teacher == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Teacher not logged in"
            );
        }
        return teacher;
    }
}
