package com.exam.onlineexam.controller;

import com.exam.onlineexam.entity.Teacher;
import com.exam.onlineexam.repository.TeacherRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/teacher")
public class TeacherAuthController {

    private final TeacherRepository teacherRepository;

    public TeacherAuthController(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Teacher request,
            HttpSession session
    ) {
        Optional<Teacher> opt =
                teacherRepository.findByLoginId(request.getLoginId());

        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid login");
        }

        Teacher teacher = opt.get();

        // ✅ PLAIN TEXT COMPARISON
        if (!teacher.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // ✅ Store teacher separately in session
        session.setAttribute("loggedInTeacher", teacher);

        return ResponseEntity.ok(teacher);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
