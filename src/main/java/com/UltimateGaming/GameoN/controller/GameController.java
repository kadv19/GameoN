package com.UltimateGaming.GameoN.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.UltimateGaming.GameoN.exception.GameNotFoundException;
import com.UltimateGaming.GameoN.model.Game;
import com.UltimateGaming.GameoN.repository.GameRepository;
import com.UltimateGaming.GameoN.dto.GameDto;
import com.UltimateGaming.GameoN.service.GameService;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @PostMapping
    public Game addGame(@Valid @RequestBody GameDto gameDto) {
        return gameService.createGame(gameDto);
    }
    
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable String id) {
        return gameRepository.findById(id)
                             .orElseThrow(() -> new GameNotFoundException(id));
    }

    @DeleteMapping
    public String deleteAllGames() {
        gameRepository.deleteAll();
        return "All games have been deleted successfully.";
    }
}