package com.UltimateGaming.GameoN.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.UltimateGaming.GameoN.model.Game;
import com.UltimateGaming.GameoN.repository.GameRepository;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @PostMapping
    public Game addGame(@Valid @RequestBody Game game) {
        return gameRepository.save(game);
    }

     @DeleteMapping
    public String deleteAllGames() {
        gameRepository.deleteAll();
        return "All games have been deleted successfully.";
    }
}