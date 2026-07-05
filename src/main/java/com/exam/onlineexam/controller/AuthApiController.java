package com.exam.onlineexam.controller;

import com.exam.onlineexam.dto.LoginRequest;
import com.exam.onlineexam.dto.LoginResponse;
import com.exam.onlineexam.entity.User;
import com.exam.onlineexam.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthApiController {

    private final UserRepository userRepository;

    public AuthApiController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /* =======================
       STUDENT LOGIN
       ======================= */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request,
            HttpSession session
    ) {
        Optional<User> optionalUser =
                userRepository.findByLoginId(request.getLoginId());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        User user = optionalUser.get();

        // Plain-text password (for now)
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        session.setAttribute("loggedInUser", user);

        return ResponseEntity.ok(
                new LoginResponse(user.getId(), user.getName())
        );
    }

    /* =======================
       LOGOUT
       ======================= */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
